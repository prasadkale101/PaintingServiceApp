// Bun-compatible build script for Painting Service App - Corrected version
const fs = require('fs');
const path = require('path');

console.log('🔧 Building client application with Bun...');

// Create build directory if it doesn't exist
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copy static files (index.html and assets) to build directory
const sourceFiles = [
  'public/index.html',
  'public/images/logo.jpg',
  'public/images/painting-1.jpg',
  'public/images/painting-2.jpg',
  'public/images/painting-3.jpg',
  'src/index.css'
];

sourceFiles.forEach(file => {
  const sourcePath = path.join(__dirname, file);
  if (fs.existsSync(sourcePath)) {
    const destPath = path.join(buildDir, path.basename(file));
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Copied: ${file}`);
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

// Copy source directories (components, db)
const sourceDirs = [
  'src/components',
  'src/db'
];

sourceDirs.forEach(dir => {
  const sourcePath = path.join(__dirname, dir);
  if (fs.existsSync(sourcePath)) {
    const destPath = path.join(buildDir, path.basename(dir));
    // Create directory if it doesn't exist
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    // Copy files from source to destination
    const files = fs.readdirSync(sourcePath);
    files.forEach(file => {
      const srcFile = path.join(sourcePath, file);
      const destFile = path.join(destPath, file);
      if (fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`✅ Copied: ${dir}/${file}`);
      }
    });
  }
});

// Copy main source files with correct extensions
const mainFiles = [
  'src/App.tsx',
  'src/AddReview.tsx',
  'src/index.tsx',
  'src/types.ts'
];

mainFiles.forEach(file => {
  const sourcePath = path.join(__dirname, file);
  if (fs.existsSync(sourcePath)) {
    const destPath = path.join(buildDir, path.basename(file));
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Copied: ${file}`);
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

// Create a basic index.html if it doesn't exist in build
const indexPath = path.join(buildDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Painting Service App</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
    <div id="root">Application loading...</div>
    <script src="./index.js"></script>
</body>
</html>`;

  fs.writeFileSync(indexPath, htmlContent);
  console.log('✅ Created basic index.html');
}

console.log('\n✅ Client build completed successfully!');
console.log('\n📁 Build directory contents:');
const files = fs.readdirSync(buildDir);
files.forEach(file => console.log(`   - ${file}`));

// Try to verify we have the key files needed for a working app
const requiredFiles = ['index.html', 'index.css', 'App.tsx', 'AddReview.tsx'];
let allPresent = true;
requiredFiles.forEach(file => {
  const filePath = path.join(buildDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Missing required file: ${file}`);
    allPresent = false;
  }
});

if (allPresent) {
  console.log('\n🎉 All required files present for application to work!');
} else {
  console.log('\n⚠️  Some files may be missing. Please check the build output above.');
}