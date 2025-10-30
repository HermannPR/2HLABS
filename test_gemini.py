"""
Test Gemini API for image generation
"""

import google.generativeai as genai

# Configure API
genai.configure(api_key="AIzaSyBGd71Y1l7c94qZQEsxf4GPTO6K06KlTv8")

# List available models
print("Available models:")
for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"- {model.name}")
        if hasattr(model, 'description'):
            print(f"  {model.description}")

print("\n" + "="*60)

# Test image generation
print("\nTesting image generation with Gemini...")

try:
    # Try the experimental image generation model
    model = genai.GenerativeModel('gemini-2.0-flash-exp')

    prompt = """Create a high-contrast,energetic fitness brand logo of a powerful gorilla
    breaking through barriers on a white background. Bold, dynamic, modern sports aesthetic.
    No text."""

    print(f"Sending prompt: {prompt[:100]}...")

    response = model.generate_content(prompt)

    print("\nResponse received!")
    print(f"Response type: {type(response)}")
    print(f"Has parts: {hasattr(response, 'parts')}")

    if hasattr(response, 'parts'):
        print(f"Number of parts: {len(response.parts)}")
        for i, part in enumerate(response.parts):
            print(f"\nPart {i}:")
            print(f"  Type: {type(part)}")
            print(f"  Has inline_data: {hasattr(part, 'inline_data')}")
            print(f"  Has text: {hasattr(part, 'text')}")
            if hasattr(part, 'text'):
                print(f"  Text content: {part.text[:200]}")

    print(f"\nFull response: {response}")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
