#!/bin/bash

echo "🚀 Starting Painting Service App with Bun..."

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Please install Bun first:"
    echo "   npm install -g bun"
    exit 1
fi

# Start the server
echo "Starting server on port 3001..."
bun run server-bun.js

echo "✅ Server started successfully!"
echo "🌐 Access the application at http://localhost:3001"