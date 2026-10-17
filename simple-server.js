const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve the React app for all other routes
app.get('*', (req, res) => {
  console.log(`Serving index.html for route: ${req.path}`);
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Simple server is running on http://localhost:${PORT}`);
  console.log('✅ Server successfully serving build files');
  console.log('📁 Build directory contents:');

  const fs = require('fs');
  const files = fs.readdirSync(path.join(__dirname, 'build'));
  files.forEach(file => console.log(`   - ${file}`));
});

process.on('SIGINT', () => {
  console.log('\n🛑 Server stopped');
  process.exit(0);
});