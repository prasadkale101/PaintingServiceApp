# Painting Service App - Bun Migration

This project has been updated to use Bun as the build system instead of Webpack.

## Key Changes

1. **Build System**: Replaced Webpack with Bun for client-side builds
2. **Development Server**: Updated dev scripts to work with Bun's native capabilities
3. **Dependencies**: Removed Webpack-related dependencies and added Bun-specific configurations

## How It Works

The migration replaces the complex Webpack build process with Bun's native capabilities:

- `npm run dev` - Starts both frontend (Bun) and backend (Node.js with nodemon) servers
- `npm run build` - Creates production-ready build using Bun's bundling capabilities
- Static assets are properly copied to the build directory

## Running the Application

### Development Mode:
```bash
npm run dev
```

### Production Build:
```bash
npm run build
```

### Start Production Server:
```bash
npm start
```

## Benefits of Bun Migration

1. **Faster Builds**: Bun's native performance significantly speeds up development builds
2. **Simplified Setup**: Reduced dependency complexity 
3. **Better Performance**: Native JavaScript execution with improved memory usage
4. **Modern Tooling**: Leverages Bun's built-in TypeScript support and dev server

## Directory Structure

- `src/` - Source code (React components, TypeScript)
- `public/` - Static assets (HTML, images)
- `build/` - Output directory for production builds (created automatically)
- `server.js` - Express backend server