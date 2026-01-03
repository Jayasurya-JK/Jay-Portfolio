from PIL import Image

input_path = 'public/favicon.png'
output_path = 'public/favicon.ico'

try:
    # Open the source image (handle transparency)
    img = Image.open(input_path).convert("RGBA")
    
    # Create a white background image
    background = Image.new("RGBA", img.size, (255, 255, 255, 255))
    
    # Composite the logo onto the white background
    combined = Image.alpha_composite(background, img)
    
    # Define sizes
    icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    
    # Save as ICO (convert to RGB or maintain RGBA if desired, but usually ICO handles transparent. 
    # But since we want WHITE background, it will be opaque.)
    combined.save(output_path, format='ICO', sizes=icon_sizes)
    
    print(f"Successfully converted {input_path} to {output_path} with WHITE background.")

except Exception as e:
    print(f"Error converting favicon: {e}")
