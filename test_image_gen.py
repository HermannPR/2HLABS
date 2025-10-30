"""
Test Gemini Image Generation Model
"""

import google.generativeai as genai
from pathlib import Path

# Configure API
genai.configure(api_key="AIzaSyBGd71Y1l7c94qZQEsxf4GPTO6K06KlTv8")

print("="*60)
print("Testing Gemini Image Generation")
print("="*60)

# Use the image generation model
model_name = "gemini-2.0-flash-exp-image-generation"
print(f"\nUsing model: {model_name}")

try:
    model = genai.GenerativeModel(model_name)

    prompt = """Create a high-contrast, energetic fitness brand logo with clean lines on a WHITE BACKGROUND.
Style: Modern fitness branding, bold and dynamic, vibrant colors, professional sports supplement aesthetic.
DO NOT include any text or words.

An aggressive, powerful gorilla silhouette breaking through barriers, muscles flexed. Raw power and explosive energy radiating outward. Shattered ground beneath. Intense red and black color scheme with explosive orange accents. Aggressive, intimidating, maximum intensity visual."""

    print("\nGenerating image...")
    print(f"Prompt: {prompt[:150]}...")

    response = model.generate_content(prompt)

    print("\nResponse received!")
    print(f"Has parts: {hasattr(response, 'parts')}")

    if hasattr(response, 'parts'):
        print(f"Number of parts: {len(response.parts)}")

        for i, part in enumerate(response.parts):
            print(f"\nPart {i}:")
            print(f"  Has inline_data: {hasattr(part, 'inline_data')}")

            if hasattr(part, 'inline_data'):
                inline_data = part.inline_data
                print(f"  Mime type: {inline_data.mime_type}")
                print(f"  Data size: {len(inline_data.data)} bytes")

                # Save test image
                test_path = Path("public/assets/souls/test-gorilla.png")
                test_path.parent.mkdir(parents=True, exist_ok=True)

                with open(test_path, 'wb') as f:
                    f.write(inline_data.data)

                print(f"\n[SUCCESS] Test image saved to: {test_path}")
                print("Check the file to verify image generation works!")

            if hasattr(part, 'text'):
                print(f"  Text: {part.text[:200]}")

except Exception as e:
    print(f"\n[ERROR] {e}")
    import traceback
    traceback.print_exc()

print("\n" + "="*60)
