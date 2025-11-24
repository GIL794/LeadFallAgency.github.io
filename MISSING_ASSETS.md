# Missing Assets Documentation

## Hero Section Background Images

The static HTML site requires background images for hero sections that are referenced in the Shopify theme but not included in the theme export (they're hosted on Shopify's CDN).

### Required Images

Based on `templates/index.json`, these images are needed:

1. **First Hero Section ("the company")**
   - Shopify reference: `shopify://shop_images/Lead_Falll_Agency_34.png`
   - Used in: First slideshow section
   - Current: Using placeholder image
   - Dimensions: Recommended 1920x1080 or larger

2. **Second Hero Section ("step into ai")**
   - Shopify reference: `shopify://shop_images/27.png`
   - Used in: Second slideshow section with "step into ai" text
   - Current: Using placeholder image
   - Dimensions: Recommended 1920x1080 or larger

3. **Career Section (currently disabled in template)**
   - Shopify reference: `shopify://shop_images/Lead_Falll_Agency_5_2a0c7e49-832d-4838-98c3-de0fe7833652.png`
   - Used in: Career slideshow (disabled but in template)
   - Current: Not used in static site

### Header Logo

Based on `config/settings_data.json`:

4. **Header Logo**
   - Shopify reference: `shopify://shop_images/7.png`
   - Used in: Site header
   - Current: Using `assets/images/logo.svg` placeholder
   - Dimensions: Logo size (current SVG works)

5. **Inverted Logo (for overlay header)**
   - Shopify reference: `shopify://shop_images/6_2.png`
   - Used in: Header when overlaying hero images
   - Current: Not implemented

### How to Add These Images

**Option 1: Download from Live Site**
```bash
# Visit leadfallagency.com and use browser dev tools to:
# 1. Find the background images in the hero sections
# 2. Right-click and "Save image as"
# 3. Place in assets/images/ directory
# 4. Update paths in index.html
```

**Option 2: Export from Shopify Admin**
If you have access to the Shopify admin:
1. Go to Content → Files
2. Search for the image filenames
3. Download the images
4. Place in assets/images/

**Option 3: Use Shopify CDN URLs (if accessible)**
The images might be accessible via:
```
https://cdn.shopify.com/s/files/1/[shop-id]/[file-id]/Lead_Falll_Agency_34.png
```
But this requires knowing the shop ID and file IDs.

### Update Instructions

Once you have the images:

1. Place images in `assets/images/`:
   ```
   assets/images/hero-company.jpg
   assets/images/hero-ai.jpg
   assets/images/logo-main.png
   ```

2. Update `index.html` hero sections:
   ```html
   <!-- Replace the placeholder div with: -->
   <div class="hero__image" style="background-image: url('assets/images/hero-company.jpg'); ...">
   ```

3. Or use img tags:
   ```html
   <img src="assets/images/hero-company.jpg" alt="Lead Fall Agency" class="hero__image">
   ```

### Current Workaround

The site currently uses:
- Placeholder gradient backgrounds via inline styles
- The existing `password-page-background.jpg` could be temporarily used for testing
- Color overlays to make text readable

### Testing

To test with actual images:
1. Add images to `assets/images/`
2. Update paths in HTML
3. Run local server: `python3 -m http.server 8000`
4. View at `http://localhost:8000`
5. Check responsive behavior at different screen sizes

---

**Note**: The Shopify theme export doesn't include uploaded images, only references to them. You'll need to get these from the live site or Shopify admin.
