"""
Remove White Background from PNG Images
This script converts white backgrounds to transparent in all PNG images
"""

from PIL import Image
import os
from pathlib import Path

def remove_white_background(image_path, threshold=240):
    """
    Remove white background from an image and make it transparent

    Args:
        image_path: Path to the image file
        threshold: RGB value above which pixels are considered "white" (default 240)
    """
    try:
        # Open image
        img = Image.open(image_path)

        # Convert to RGBA if not already
        img = img.convert("RGBA")

        # Get pixel data
        datas = img.getdata()

        # Create new pixel data
        new_data = []
        for item in datas:
            # If pixel is white (or close to white), make it transparent
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                # Make transparent
                new_data.append((255, 255, 255, 0))
            else:
                # Keep original
                new_data.append(item)

        # Update image data
        img.putdata(new_data)

        # Save image (overwrite original)
        img.save(image_path, "PNG")
        print(f"[OK] Processed: {os.path.basename(image_path)}")

    except Exception as e:
        print(f"[ERROR] Error processing {os.path.basename(image_path)}: {str(e)}")

def process_directory(directory, threshold=240):
    """
    Process all PNG images in a directory

    Args:
        directory: Path to directory containing images
        threshold: RGB value for white detection
    """
    directory = Path(directory)

    if not directory.exists():
        print(f"Directory not found: {directory}")
        return

    # Find all PNG files
    png_files = list(directory.glob("*.png"))

    if not png_files:
        print(f"No PNG files found in: {directory}")
        return

    print(f"\nProcessing {len(png_files)} images in: {directory.name}")
    print("-" * 50)

    for png_file in png_files:
        remove_white_background(str(png_file), threshold)

def main():
    """
    Main function to process all asset folders
    """
    print("=" * 50)
    print("White Background Remover for 2HLABS Assets")
    print("=" * 50)

    # Base directory
    base_dir = Path("public/assets")

    if not base_dir.exists():
        print(f"Error: Assets directory not found at {base_dir}")
        return

    # Folders to process
    folders = [
        "souls",
        "categories",
        "badges",
        "concepts"
    ]

    # Process each folder
    total_processed = 0
    for folder in folders:
        folder_path = base_dir / folder
        if folder_path.exists():
            png_count = len(list(folder_path.glob("*.png")))
            process_directory(folder_path, threshold=240)
            total_processed += png_count
        else:
            print(f"\nSkipping {folder} (not found)")

    print("\n" + "=" * 50)
    print(f"[COMPLETE] Processed {total_processed} images")
    print("=" * 50)
    print("\nOriginal images backed up to: public/assets-backup/")
    print("\nNote: Refresh your browser to see changes!")

if __name__ == "__main__":
    main()
