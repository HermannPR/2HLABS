"""
2HLABS Asset Generator using Gemini API
Generates all brand assets using Google's Gemini 2.0 Flash Image Generation
"""

import os
import time
import google.generativeai as genai
from pathlib import Path
from typing import Dict, List
from PIL import Image
import io

# API Configuration
GEMINI_API_KEY = "AIzaSyBGd71Y1l7c94qZQEsxf4GPTO6K06KlTv8"
MODEL_NAME = "gemini-2.0-flash-exp-image-generation"  # Gemini 2.0 Flash Image Generation

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# System prompt to use with all images
SYSTEM_PROMPT = """Create a high-contrast, energetic fitness brand logo with clean lines on a WHITE BACKGROUND.
Style: Modern fitness branding, bold and dynamic, vibrant colors, professional sports supplement aesthetic.
Technical specs: High resolution (1024x1024), centered composition, white background for easy removal.
Color palette: Vibrant neon blues (#00E5FF), electric oranges (#FF6600), energetic purples, bold contrasts.
DO NOT include any text or words in the image."""

# Asset definitions
SOUL_LOGOS = {
    "gorilla-rage.png": "A powerful, muscular gorilla mascot in athletic pose with flexed muscles. Strong determination and maximum intensity. Dynamic energy effect surrounding the figure. Bold red and black color scheme with bright orange athletic accents. Fitness motivation mascot style. White background. No text.",

    "dragon-blood.png": "A stylized dragon head mascot in side profile with focused expression. Athletic power and determination. Sleek angular design with detailed features. Deep crimson and electric blue athletic color scheme with energy effects. Balanced strength mascot for sports branding. White background. No text.",

    "cheetah-sprint.png": "Athletic cheetah mascot in running sprint pose with motion lines showing speed. Sleek aerodynamic design with athletic form. Bright yellow and lime green with dynamic speed effects. Athletic speed and agility mascot for fitness branding. White background. No text.",

    "eagle-vision.png": "Majestic eagle mascot with sharp focused eyes and wings spread in flight. Detailed feather design with precision aesthetic. Sky blue and bright white color scheme with clarity visual effects. Focus and precision mascot for sports supplements. White background. No text.",

    "titan-strength.png": "Powerful athletic titan figure lifting weights overhead with strong muscular form. Mythological strength mascot design. Metallic silver, iron gray, and deep purple color scheme. Maximum strength training mascot for fitness brand. White background. No text.",

    "wolf-pack.png": "Athletic wolf mascot howling with team pack silhouettes behind. Teamwork and unity symbolism with endurance theme. Forest green and moonlight silver color scheme. Team sports and group fitness mascot for supplement branding. White background. No text.",

    "phoenix-rise.png": "Phoenix bird mascot rising upward with wings spread and energy glow. Endurance and rebirth theme with determined posture. Bright orange, golden yellow, and flame red athletic colors. Endurance and stamina mascot for sports supplements. White background. No text.",

    "bear-endurance.png": "Strong bear mascot in steady walking stance with determined expression. Grounded athletic strength with outdoor training theme. Natural brown and forest green color scheme. Steady endurance and sustainable power mascot. White background. No text.",

    "mantis-focus.png": "Praying mantis mascot in focused athletic pose with detailed precision design. Mind-muscle connection theme with geometric precision elements. Bright lime green and white with sharp focus aesthetic. Technical precision and control mascot for fitness brand. White background. No text.",

    "thunder-strike.png": "Dynamic lightning bolt energy symbol with storm cloud effects. High intensity interval training theme with electric energy patterns. Electric blue, bright purple, and storm yellow athletic colors. Maximum intensity workout energy mascot. White background. No text.",

    "serpent-flow.png": "Elegant serpent mascot in flowing S-curve motion with zen aesthetic. Flexibility and mindful movement theme. Soft jade green and calming mint color scheme. Yoga and recovery mascot for supplements. White background. No text.",

    "lion-heart.png": "Majestic lion head mascot with determined expression and noble posture. Consistent training and courage theme with athletic strength. Royal gold, athletic orange, and courage red color scheme. Daily warrior mascot for fitness supplements. White background. No text."
}

CATEGORY_ICONS = {
    "energy.png": "Lightning bolt icon with energy waves radiating outward. Vibrant electric yellow and orange. Dynamic motion. Supplement category aesthetic. White background. No text. 512x512.",

    "strength.png": "Flexed bicep muscle icon with power lines and definition. Bold red and dark gray. Strong, powerful visual. Supplement category aesthetic. White background. No text. 512x512.",

    "endurance.png": "Circular arrow infinity symbol with runner silhouette inside. Vibrant green and blue. Continuous motion energy. Supplement category aesthetic. White background. No text. 512x512.",

    "focus.png": "Target crosshair with brain/neural network pattern inside. Sharp purple and cyan. Precision and clarity. Supplement category aesthetic. White background. No text. 512x512.",

    "hydration.png": "Water droplet icon with hydration waves and freshness splash. Clear blue and aqua. Clean, refreshing visual. Supplement category aesthetic. White background. No text. 512x512.",

    "recovery.png": "Circular refresh icon with muscle repair visualization inside. Calming green and soft blue. Healing energy. Supplement category aesthetic. White background. No text. 512x512."
}

BADGES = {
    "lab-tested.png": "Circular badge with laboratory beaker and checkmark symbol in center. Professional certification style. Blue and white color scheme. Clean lines, trust-worthy design, supplement industry standard. White background. Text 'LAB TESTED' in badge. 512x512.",

    "clinical-dosages.png": "Circular badge with precise measurement scale and accuracy symbol. Professional certification style. Green and white color scheme. Science-backed visual, clinical aesthetic, professional trust indicator. White background. Text 'CLINICAL DOSAGES' in badge. 512x512.",

    "science-backed.png": "Circular badge with molecular structure and research symbol in center. Professional certification style. Purple and white color scheme. Scientific credibility, research-backed visual, academic trust indicator. White background. Text 'SCIENCE BACKED' in badge. 512x512.",

    "full-transparency.png": "Circular badge with open book or transparency symbol in center. Professional certification style. Orange and white color scheme. Honesty indicator, full disclosure visual, consumer trust symbol. White background. Text 'FULL TRANSPARENCY' in badge. 512x512."
}

CONCEPTS = {
    "dimensions.png": "5-dimensional radar/spider chart with glowing points connected by energy lines. Modern data visualization style. Neon cyan and purple on white background. Represents: intensity, duration, focus, energy pattern, stim tolerance. Clean, tech-forward, fitness science aesthetic. 1024x1024. White background.",

    "personalization.png": "Customization icon with adjustable sliders and personalized settings visual. Modern UI/UX style with fitness aesthetic. Cyan and orange accents. Individual-focused, tailored supplement concept. White background. 1024x1024.",

    "soul-core.png": "Central energy core orb with pulsing power, geometric sacred geometry patterns. Glowing cyan center with energy rings. Spiritual meets science aesthetic. Foundation of the 'soul' identity system. White background. 1024x1024.",

    "soul-smoke.png": "Same energy core as soul-core.png but with ethereal smoke/energy tendrils flowing from edges. Wispy, dynamic energy smoke in cyan and purple. Spiritual power visualization. Animated soul concept, can be layered with soul-core. White background. 1024x1024."
}

BACKGROUNDS = {
    "hero-bg.png": "Abstract fitness energy background with flowing light trails, particle effects, and dynamic motion. Dark base with glowing cyan (#00E5FF), purple, and orange light streaks. Energetic, premium feel, suitable for hero section overlay at 30% opacity. Subtle texture, not too busy, allows text overlay. Size: 1920x1080."
}


def generate_image_gemini(prompt: str, filename: str) -> bytes:
    """
    Generate image using Gemini 2.0 Flash Image Generation
    """
    # Combine system prompt with specific prompt
    full_prompt = f"{SYSTEM_PROMPT}\n\n{prompt}"

    try:
        # Initialize the model
        model = genai.GenerativeModel(MODEL_NAME)

        # Generate image
        print(f"[API] Sending request to Gemini...")
        response = model.generate_content(
            full_prompt,
            generation_config=genai.GenerationConfig(
                temperature=0.7,
                top_p=0.95,
                top_k=40,
                max_output_tokens=8192,
            )
        )

        # Check if response contains image
        if response and hasattr(response, 'parts'):
            for part in response.parts:
                if hasattr(part, 'inline_data'):
                    # Get image data
                    image_data = part.inline_data.data
                    print(f"[OK] Image generated successfully")
                    return image_data

        print(f"[ERROR] No image data in response for {filename}")
        print(f"Response: {response}")
        return None

    except Exception as e:
        print(f"[ERROR] Failed to generate {filename}: {str(e)}")
        import traceback
        traceback.print_exc()
        return None


def save_image(image_data: bytes, folder: str, filename: str) -> bool:
    """Save image data to file"""
    if not image_data:
        return False

    # Create folder if it doesn't exist
    folder_path = Path(folder)
    folder_path.mkdir(parents=True, exist_ok=True)

    # Save image
    file_path = folder_path / filename
    try:
        with open(file_path, 'wb') as f:
            f.write(image_data)
        print(f"[SAVED] {file_path}")
        return True
    except Exception as e:
        print(f"[ERROR] Failed to save {filename}: {str(e)}")
        return False


def generate_batch(batch_name: str, prompts: Dict[str, str], folder: str, delay: int = 3):
    """Generate a batch of images"""
    print(f"\n{'='*60}")
    print(f"GENERATING: {batch_name}")
    print(f"{'='*60}\n")

    total = len(prompts)
    success = 0

    for idx, (filename, prompt) in enumerate(prompts.items(), 1):
        print(f"[{idx}/{total}] Generating {filename}...")

        # Generate image
        image_data = generate_image_gemini(prompt, filename)

        # Save image
        if image_data and save_image(image_data, folder, filename):
            success += 1

        # Rate limiting delay (except for last item)
        if idx < total:
            print(f"[WAIT] Waiting {delay}s before next request...")
            time.sleep(delay)

    print(f"\n[BATCH COMPLETE] {success}/{total} images generated successfully\n")
    return success


def main():
    """Main execution function"""
    print("="*60)
    print("2HLABS ASSET GENERATOR")
    print("Powered by Google Gemini Imagen API")
    print("="*60)
    print("\n⚠️  WARNING: This script uses your Gemini API key.")
    print("⚠️  Make sure to regenerate your API key after sharing it.")
    print("\nStarting generation in 3 seconds...\n")
    time.sleep(3)

    base_path = Path("public/assets")

    # Track totals
    total_success = 0
    total_images = (
        len(SOUL_LOGOS) +
        len(CATEGORY_ICONS) +
        len(BADGES) +
        len(CONCEPTS) +
        len(BACKGROUNDS)
    )

    # Generate each batch
    total_success += generate_batch(
        "SOUL LOGOS (12 images)",
        SOUL_LOGOS,
        str(base_path / "souls"),
        delay=3
    )

    total_success += generate_batch(
        "CATEGORY ICONS (6 images)",
        CATEGORY_ICONS,
        str(base_path / "categories"),
        delay=2
    )

    total_success += generate_batch(
        "TRUST BADGES (4 images)",
        BADGES,
        str(base_path / "badges"),
        delay=2
    )

    total_success += generate_batch(
        "CONCEPT IMAGES (4 images)",
        CONCEPTS,
        str(base_path / "concepts"),
        delay=2
    )

    total_success += generate_batch(
        "BACKGROUNDS (1 image)",
        BACKGROUNDS,
        str(base_path / "backgrounds"),
        delay=1
    )

    # Final summary
    print("\n" + "="*60)
    print("GENERATION COMPLETE")
    print("="*60)
    print(f"Total: {total_success}/{total_images} images generated successfully")
    print("\nNext steps:")
    print("1. Review generated images")
    print("2. Run: python remove_white_bg.py")
    print("3. Refresh browser (Ctrl+F5)")
    print("4. Build: npm run build")
    print("="*60)


if __name__ == "__main__":
    main()
