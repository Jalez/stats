#!/bin/bash
npm install
npm run build
# Define directories
VITE_BUILD_DIR="eduml_build"
DJANGO_PROJECT_DIR="../eduml"
DJANGO_TEMPLATES_DIR="$DJANGO_PROJECT_DIR/rankings/templates"
DJANGO_STATIC_DIR="$DJANGO_PROJECT_DIR/static/assets"


# Adjust paths in index.html
sed -i 's|./assets/|/eduml/static/assets/|g' "$VITE_BUILD_DIR/index.html"

# Adjust paths inside generated JS and CSS files in the assets folder
find "$VITE_BUILD_DIR/assets" -type f \( -name "*.js" -o -name "*.css" \) -exec sed -i 's|./assets/|/eduml/static/assets/|g' {} +

echo "Paths adjusted successfully!"

# Rename and move the index.html to rankings.html in Django's templates directory
mv "$VITE_BUILD_DIR/index.html" "$VITE_BUILD_DIR/rankings.html"
rm -f "$DJANGO_TEMPLATES_DIR/rankings.html"
mv "$VITE_BUILD_DIR/rankings.html" "$DJANGO_TEMPLATES_DIR/"

# Move image assets to Django's templates directory
# for ext in svg webp png jpg jpeg; do
#   find "$VITE_BUILD_DIR/assets" -type f -name "*.$ext" -exec mv {} "$DJANGO_TEMPLATES_DIR/assets" \;
# done

# Remove old assets in Django's static directory and move new assets
rm -rf "$DJANGO_STATIC_DIR"
mkdir -p "$DJANGO_STATIC_DIR"
mv "$VITE_BUILD_DIR/assets"/* "$DJANGO_STATIC_DIR/"

# Cleanup if there's any leftover in Vite's build directory
rm -rf "$VITE_BUILD_DIR/assets"

echo "Assets moved and paths adjusted successfully!"
