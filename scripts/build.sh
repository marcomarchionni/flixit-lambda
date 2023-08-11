#!/bin/bash

# Variables
DIST_DIR="dist"
ZIP_NAME="flixit-lambda.zip"

# Compile TypeScript code
echo "Compiling TypeScript code..."
tsc

# Create dist directory if it doesn't exist
echo "Creating $DIST_DIR directory..."
mkdir -p $DIST_DIR

# Copy package.json to dist directory
echo "Copying package.json to $DIST_DIR directory..."
cp package.json $DIST_DIR/

# Navigate to dist directory
cd $DIST_DIR

# Install production dependencies only
echo "Installing production dependencies..."
npm install --only=prod 

# Delete package.json and package-lock.json from dist directory
echo "Deleting package.json and package-lock.json from $DIST_DIR directory..."
rm package.json package-lock.json

# Create ZIP file excluding certain files
echo "Creating ZIP file $ZIP_NAME..."
zip -r $ZIP_NAME ./* -x "*.zip" "./test/*"

# Navigate back to the original directory
cd ..

echo "Build complete."
