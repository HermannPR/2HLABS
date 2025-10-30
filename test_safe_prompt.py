"""
Test safer prompt that should pass content filters
"""

import google.generativeai as genai
from pathlib import Path

# Configure API
genai.configure(api_key="AIzaSyBGd71Y1l7c94qZQEsxf4GPTO6K06KlTv8")

SYSTEM_PROMPT = """Create a high-contrast, energetic fitness brand logo with clean lines on a WHITE BACKGROUND.
Style: Modern fitness branding, bold and dynamic, vibrant colors, professional sports supplement aesthetic.
Technical specs: High resolution (1024x1024), centered composition, white background for easy removal.
Color palette: Vibrant neon blues (#00E5FF), electric oranges (#FF6600), energetic purples, bold contrasts.
DO NOT include any text or words in the image."""

GORILLA_PROMPT = "A powerful, muscular gorilla mascot in athletic pose with flexed muscles. Strong determination and maximum intensity. Dynamic energy effect surrounding the figure. Bold red and black color scheme with bright orange athletic accents. Fitness motivation mascot style. White background. No text."

full_prompt = f"{SYSTEM_PROMPT}\n\n{GORILLA_PROMPT}"

print("="*60)
print("Testing Safer Gorilla Prompt")
print("="*60)

model_name = "gemini-2.0-flash-exp-image-generation"
print(f"\nUsing model: {model_name}")

try:
    model = genai.GenerativeModel(model_name)

    print("\nGenerating gorilla mascot...")
    response = model.generate_content(full_prompt)

    print("\n[OK] Response received!")

    # Check if prompt was blocked
    if hasattr(response, 'prompt_feedback'):
        print(f"\n[FEEDBACK] {response.prompt_feedback}")

    # Check candidates
    if hasattr(response, 'candidates') and response.candidates:
        print(f"\n[CANDIDATES] Found {len(response.candidates)} candidates")

        for candidate in response.candidates:
            if hasattr(candidate, 'finish_reason'):
                print(f"  Finish reason: {candidate.finish_reason}")
            if hasattr(candidate, 'safety_ratings'):
                print(f"  Safety ratings: {candidate.safety_ratings}")
            if hasattr(candidate, 'content') and candidate.content.parts:
                for part in candidate.content.parts:
                    if hasattr(part, 'inline_data'):
                        inline_data = part.inline_data
                        data_size = len(inline_data.data)

                        if data_size > 0:
                            print(f"[SUCCESS] Image generated: {data_size} bytes")

                            # Save image
                            test_path = Path("public/assets/souls/gorilla-rage-test.png")
                            test_path.parent.mkdir(parents=True, exist_ok=True)

                            with open(test_path, 'wb') as f:
                                f.write(inline_data.data)

                            print(f"[SAVED] {test_path}")
                            print("\nImage generation successful!")
                        else:
                            print(f"[BLOCKED] Empty image data")

                    if hasattr(part, 'text'):
                        print(f"[TEXT] {part.text}")
    else:
        print("\n[BLOCKED] No candidates in response - prompt was likely blocked by safety filters")

except Exception as e:
    print(f"\n[ERROR] {e}")
    import traceback
    traceback.print_exc()

print("\n" + "="*60)
