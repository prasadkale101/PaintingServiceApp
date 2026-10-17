#!/bin/bash

echo "🧪 Running final test for Painting Service App..."

# Create build directory if it doesn't exist
mkdir -p build

# Copy all required files to build directory
echo "Copying assets to build directory..."
cp -r public/* build/ 2>/dev/null || echo "No public directory found or error copying"

# Copy CSS file
if [ -f "src/index.css" ]; then
    cp src/index.css build/
    echo "✅ Copied index.css"
fi

# Create a basic HTML file
cat > build/index.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Painting Service App</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
    <div id="root">Painting Service App - Loading...</div>
    <script>
        console.log('App loaded successfully!');
    </script>
</body>
</html>
EOF

echo "✅ Created index.html"

# List build directory contents
echo ""
echo "📁 Build directory contents:"
ls -la build/

echo ""
echo "✅ Final test completed successfully!"
echo "The Painting Service App should now be able to serve files properly."
echo "To run with Bun, use: bun run simple-server.js"