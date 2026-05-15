from PIL import Image
import numpy as np

def make_transparent(image_path, out_path_color, out_path_white):
    img = Image.open(image_path).convert("RGBA")
    data = np.array(img)
    
    # White background removal
    # A pixel is considered background if its R, G, B are all > 230
    r, g, b, a = data.T
    white_areas = (r > 230) & (g > 230) & (b > 230)
    data[..., 3][white_areas.T] = 0
    
    transparent_img = Image.fromarray(data)
    
    # Crop the image to its bounding box
    bbox = transparent_img.getbbox()
    if bbox:
        # The user reported a stripe at the beginning (left) and that +8 cropped the "S".
        # We'll crop just 2 pixels from the left to remove the thin artifact line.
        new_left = bbox[0] + 2
        if new_left < bbox[2]:
            bbox = (new_left, bbox[1], bbox[2], bbox[3])
        transparent_img = transparent_img.crop(bbox)
        
    transparent_img.save(out_path_color)
    print(f"Saved color logo to {out_path_color}")
    
    # Create the white inverted logo
    white_data = np.array(transparent_img)
    r, g, b, a = white_data.T
    non_transparent = a > 0
    
    white_data[..., 0][non_transparent.T] = 255
    white_data[..., 1][non_transparent.T] = 255
    white_data[..., 2][non_transparent.T] = 255
    
    white_img = Image.fromarray(white_data)
    white_img.save(out_path_white)
    print(f"Saved white logo to {out_path_white}")

if __name__ == "__main__":
    make_transparent(
        "/Users/artemtarianik/kate1/files/Logo neue png.png",
        "/Users/artemtarianik/kate1/logo.png",
        "/Users/artemtarianik/kate1/images/logo-footer.png"
    )
