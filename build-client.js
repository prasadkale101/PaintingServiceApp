// Simple build script for Painting Service App
const fs = require('fs');
const path = require('path');

console.log('🔧 Building client application...');

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

// Create a basic index.html if it doesn't exist
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

// Check if build/index.js exists - if not, we need to bundle the React app
const jsFilePath = path.join(buildDir, 'index.js');
if (!fs.existsSync(jsFilePath)) {
  console.log('⚠️  React bundle (index.js) not found in build directory.');
  console.log('   You may need to run webpack to build the React application.');
}

console.log('✅ Client build completed successfully!');
console.log('\n📁 Build directory contents:');
const files = fs.readdirSync(buildDir);
files.forEach(file => console.log(`   - ${file}`));