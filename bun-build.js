import { build } from 'bun';
import fs from 'fs';
import path from 'path';

const buildDir = path.join(process.cwd(), 'build');
if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir, { recursive: true });

// Compile React entry point
build({
  entryPoints: ['src/index.tsx'],
  outdir: 'build',
  minify: true,
  target: 'browser',
  format: 'esm',
});

// Copy CSS
const cssSrc = path.join('src', 'index.css');
const cssDest = path.join(buildDir, 'index.css');
if (fs.existsSync(cssSrc)) {
  fs.copyFileSync(cssSrc, cssDest);
} else {
  console.warn('⚠️  index.css not found in src/');
}

// Recursively copy public assets
function copyAssetsRecursive(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  entries.forEach((entry) => {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
      copyAssetsRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

const publicDir = path.join(process.cwd(), 'public');
if (fs.existsSync(publicDir)) {
  copyAssetsRecursive(publicDir, buildDir);
} else {
  console.warn('⚠️  public directory not found');
}

// Generate index.html
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Painting Service App</title>
  <link rel="stylesheet" href="/index.css" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/index.js"></script>
</body>
</html>`;
fs.writeFileSync(path.join(buildDir, 'index.html'), html);

console.log('✅ Build completed successfully!');
