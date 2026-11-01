import cv2
import numpy as np
from PIL import Image

input_path = r'C:\Users\syedg\.gemini\antigravity\brain\987b2f99-0fd9-46e7-a2bf-765b28e5dc4c\.user_uploaded\media_1793490756436_8e956b6d.png'
img = Image.open(input_path).convert('RGBA')
arr = np.array(img)
h, w = arr.shape[:2]

# Erase the smudge at bottom right
for y in range(440, h):
    for x in range(355, w):
        arr[y, x] = [255, 255, 255, 255]

# Convert to int32 for overflow-free color analysis
arr32 = arr.astype(np.int32)
r, g, b = arr32[:, :, 0], arr32[:, :, 1], arr32[:, :, 2]

# Blue chip condition: strong blue, much higher than red and green
is_chip = (b > 160) & (b > r + 60) & (b > g + 60)

# Background seed mask: start from borders where it is not chip
is_not_chip = (~is_chip).astype(np.uint8)

# Flood fill from borders
flood_canvas = is_not_chip.copy()

# Seeds from all 4 borders
for x in range(w):
    if flood_canvas[0, x] == 1:
        cv2.floodFill(flood_canvas, None, (x, 0), 2)
    if flood_canvas[h - 1, x] == 1:
        cv2.floodFill(flood_canvas, None, (x, h - 1), 2)

for y in range(h):
    if flood_canvas[y, 0] == 1:
        cv2.floodFill(flood_canvas, None, (0, y), 2)
    if flood_canvas[y, w - 1] == 1:
        cv2.floodFill(flood_canvas, None, (w - 1, y), 2)

# Any pixel with value 2 is background outside the chip
is_bg = (flood_canvas == 2)
print('Background pixels:', is_bg.sum())
print('Foreground pixels (chip + brain):', (~is_bg).sum())

# Alpha channel: 0 for background, 255 for foreground
alpha = np.where(is_bg, 0, 255).astype(np.uint8)

# Anti-aliasing boundary blending:
dist_from_bg = cv2.distanceTransform((~is_bg).astype(np.uint8), cv2.DIST_L2, 3)

# Smooth boundary in a 2.5px band
edge_band = (dist_from_bg < 2.5) & (dist_from_bg > 0)
for y, x in np.argwhere(edge_band):
    d = dist_from_bg[y, x]
    alpha[y, x] = int(np.clip(d / 2.0 * 255, 40, 255))

output = arr.copy()
output[:, :, 3] = alpha

# Crop tightly with 10px margin around chip
fg_indices = np.argwhere(alpha > 10)
y_min, x_min = fg_indices.min(axis=0)
y_max, x_max = fg_indices.max(axis=0)

margin = 12
y_min = max(0, y_min - margin)
x_min = max(0, x_min - margin)
y_max = min(h, y_max + margin + 1)
x_max = min(w, x_max + margin + 1)

cropped = output[y_min:y_max, x_min:x_max]

out_img = Image.fromarray(cropped, 'RGBA')
out_path = r'c:\Projects\Skills\site\assets\logo.png'
out_img.save(out_path, 'PNG')

artifact_path = r'C:\Users\syedg\.gemini\antigravity\brain\987b2f99-0fd9-46e7-a2bf-765b28e5dc4c\logo-transparent.png'
out_img.save(artifact_path, 'PNG')
print('SUCCESS: Saved logo to', out_path, 'and', artifact_path)
