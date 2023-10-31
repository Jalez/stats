#!/bin/bash
npm run build
# Directory containing the build output from Vite
BUILD_DIR="eduml_build"

# Adjust paths in index.html
sed -i 's|./assets/|/eduml/static/assets/|g' "$BUILD_DIR/index.html"

# Adjust paths inside generated JS and CSS files in the assets folder
find "$BUILD_DIR/assets" -type f \( -name "*.js" -o -name "*.css" \) -exec sed -i 's|./assets/|/eduml/static/assets/|g' {} +

echo "Paths adjusted successfully!"