"""
Test with very simple prompt to verify model works
"""

import google.generativeai as genai
from pathlib import Path

# Configure API
genai.configure(api_key="AIzaSyBGd71Y1l7c94qZQEsxf4GPTO6K06KlTv8")

# Very simple, safe prompt
simple_prompt = "A simple blue lightning bolt icon on a white background. Modern clean design. No text."

print("="*60)
print("Testing Very Simple Prompt")
print("="*60)

model_name = "gemini-2.0-flash-exp-image-generation"
print(f"\nUsing model: {model_name}")
print(f"\nPrompt: {simple_prompt}")

try:
    model = genai.GenerativeModel(model_name)

    print("\nGenerating...")
    response = model.generate_content(simple_prompt)

    print("\n[OK] Response received!")

    # Check feedback
    if hasattr(response, 'prompt_feedback'):
        feedback = response.prompt_feedback
        print(f"\n[FEEDBACK]")
        print(f"  Block reason: {getattr(feedback, 'block_reason', 'None')}")
        print(f"  Safety ratings: {getattr(feedback, 'safety_ratings', 'None')}")

    # Check candidates
    if hasattr(response, 'candidates') and response.candidates:
        print(f"\n[CANDIDATES] Found {len(response.candidates)} candidates")

        for candidate in response.candidates:
            print(f"  Finish reason: {candidate.finish_reason}")

            if hasattr(candidate, 'content') and candidate.content.parts:
                print(f"  Number of parts: {len(candidate.content.parts)}")

                for i, part in enumerate(candidate.content.parts):
                    print(f"\n  Part {i}:")
                    print(f"    Type: {type(part)}")
                    print(f"    Has inline_data: {hasattr(part, 'inline_data')}")
                    print(f"    Has text: {hasattr(part, 'text')}")

                    # Print all attributes
                    print(f"    All attributes: {dir(part)}")

                    if hasattr(part, 'inline_data'):
                        inline_data = part.inline_data
                        print(f"    Mime type: {getattr(inline_data, 'mime_type', 'None')}")
                        data = getattr(inline_data, 'data', b'')
                        data_size = len(data) if data else 0
                        print(f"    Data size: {data_size} bytes")

                        if data_size > 0:
                            print(f"\n[SUCCESS!] Image generated: {data_size} bytes")

                            # Save image
                            test_path = Path("public/assets/test-simple.png")
                            test_path.parent.mkdir(parents=True, exist_ok=True)

                            with open(test_path, 'wb') as f:
                                f.write(data)

                            print(f"[SAVED] {test_path}")
                            print("\n✓ Model works! Image generation successful!")

                    if hasattr(part, 'text'):
                        print(f"    Text: {part.text[:200]}")
    else:
        print("\n[BLOCKED] No candidates - prompt blocked")

except Exception as e:
    print(f"\n[ERROR] {e}")
    import traceback
    traceback.print_exc()

print("\n" + "="*60)
