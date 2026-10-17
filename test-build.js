// Simple test to verify build is working
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Painting Service App build...');

const buildDir = path.join(__dirname, 'build');

// Check if build directory exists
if (!fs.existsSync(buildDir)) {
  console.log('❌ Build directory does not exist');
  process.exit(1);
}

// Check key files
const requiredFiles = [
  'index.html',
  'index.css',
  'logo.jpg',
  'painting-1.jpg',
  'painting-2.jpg',
  'painting-3.jpg'
];

let allPresent = true;
requiredFiles.forEach(file => {
  const filePath = path.join(buildDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - OK`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allPresent = false;
  }
});

if (allPresent) {
  console.log('\n🎉 All required files present in build directory');

  // Read and display index.html content
  try {
    const htmlContent = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
    console.log('\n📄 index.html structure:');
    console.log('   - Contains root div:', htmlContent.includes('<div id="root">'));
    console.log('   - Contains CSS link:', htmlContent.includes('index.css'));
    console.log('   - Contains title:', htmlContent.includes('<title>Painting Service App</title>'));
  } catch (err) {
    console.error('❌ Error reading index.html:', err.message);
  }

  // Check file sizes
  console.log('\n📊 File sizes:');
  const files = fs.readdirSync(buildDir);
  files.forEach(file => {
    const stats = fs.statSync(path.join(buildDir, file));
    if (stats.isFile()) {
      console.log(`   ${file}: ${stats.size} bytes`);
    }
  });

  console.log('\n✅ Build test completed successfully!');
} else {
  console.log('\n❌ Some required files are missing');
  process.exit(1);
}