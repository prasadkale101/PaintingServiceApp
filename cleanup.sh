#!/bin/bash
# Cleanup script for Bun migration

echo "Cleaning up temporary files..."

# Remove temporary build files if they exist
rm -f bun-build.js bun.config.ts build-client.js bun-dev-server.js

# Remove node_modules if needed (optional)
# rm -rf node_modules

echo "Cleanup completed!"