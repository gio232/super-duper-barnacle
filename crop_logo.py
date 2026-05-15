from PIL import Image

def trim(im):
    mask = Image.new("L", im.size, 0)
    pixels = im.load()
    mask_pixels = mask.load()
    for y in range(im.size[1]):
        for x in range(im.size[0]):
            p = pixels[x, y]
            if len(p) == 4:
                r, g, b, a = p
            else:
                r, g, b = p; a = 255
            
            # Ignore transparent pixels AND near-white empty background pixels
            if a > 10 and not (r > 245 and g > 245 and b > 245):
                mask_pixels[x, y] = 255
    bbox = mask.getbbox()
    if bbox:
        # Add 1px padding
        pad = 1
        bbox = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(im.size[0], bbox[2]+pad), min(im.size[1], bbox[3]+pad))
        return im.crop(bbox)
    return im

im = Image.open('logo.png').convert('RGBA')
cropped = trim(im)
cropped.save('images/logo-clean.png')
print(f"Cropped successfully. Original size: {im.size}, new size: {cropped.size}")
