// Final, complete development server for Painting Service App
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');

const express = require('express');


console.log('🚀 Starting Painting Service App development environment...');

// Check if build directory exists
const buildDir = path.join(__dirname, 'build');

if (!fs.existsSync(buildDir)) {
  console.error('❌ Build directory not found. Please run: npm run build first');
  process.exit(1);
}

// Read the existing index.html and make sure it has proper script and style tags
const indexPath = path.join(buildDir, 'index.html');
let htmlContent = '';

if (fs.existsSync(indexPath)) {
  htmlContent = fs.readFileSync(indexPath, 'utf8');
  console.log('📄 Found existing index.html in build directory');

  // Ensure it has both CSS and JavaScript references
  let needsUpdate = false;
  let fixedHtml = htmlContent;

  // Check if it has CSS link
  if (!htmlContent.includes('<link rel="stylesheet" href="./index.css">')) {
    console.log('🔧 Adding CSS link to index.html...');
    // Insert CSS link in head section
    fixedHtml = htmlContent.replace(
      '</head>',
      '    <link rel="stylesheet" href="./index.css">\n  </head>'
    );
    needsUpdate = true;
  }

  // Check if it has JavaScript reference
  if (!htmlContent.includes('<script src="./index.js"></script>')) {
    console.log('🔧 Adding JavaScript reference to index.html...');
    // Insert script before closing body tag
    fixedHtml = fixedHtml.replace(
      '</body>',
      '    <script src="./index.js"></script>\n  </body>'
    );
    needsUpdate = true;
  }

  if (needsUpdate) {
    fs.writeFileSync(indexPath, fixedHtml);
    console.log('✅ Updated index.html with proper references');
  }
} else {
  console.error('❌ index.html not found in build directory');
  // Create a basic one for debugging
  const basicHtml = `<!DOCTYPE html>
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

  fs.writeFileSync(indexPath, basicHtml);
  console.log('🔧 Created basic index.html for debugging');
}

console.log('✅ Build directory validated');

// Start Express server to serve the frontend
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// Serve static files from the build directory
app.use(express.static(buildDir));

// Mock data for services and reviews
const mockServices = [
  {
    id: 1,
    name: "Interior Painting",
    description: "Professional interior painting services for homes and businesses",
    price: "$2,500 - $8,000"
  },
  {
    id: 2,
    name: "Exterior Painting",
    description: "Complete exterior house painting including siding, trim, and doors",
    price: "$3,000 - $12,000"
  },
  {
    id: 3,
    name: "Ceiling Painting",
    description: "Specialized ceiling painting services for homes and commercial spaces",
    price: "$1,500 - $4,000"
  },
  {
    id: 4,
    name: "Trim and Doors",
    description: "Painting of trim, doors, and built-in cabinetry",
    price: "$800 - $2,500"
  },
  {
    id: 5,
    name: "Wall Repairs",
    description: "Painting with repair services for damaged walls",
    price: "$1,000 - $3,500"
  }
];

const mockReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely amazing work! The team transformed our living room completely. Highly recommend!"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    comment: "Great painters, very professional and clean. The exterior painting job was excellent."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    comment: "Outstanding service from start to finish. They were on time, kept our home clean, and the results exceeded expectations!"
  },
  {
    id: 4,
    name: "David Wilson",
    rating: 4,
    comment: "Professional team with attention to detail. My house looks brand new after their work."
  },
  {
    id: 5,
    name: "Lisa Thompson",
    rating: 5,
    comment: "Best painting service I've ever used! They were responsive, reliable, and did an excellent job."
  }
];

// API Routes
app.get('/api/services', (req, res) => {
  console.log('🔧 API: Fetching services');
  setTimeout(() => {
    res.json(mockServices);
  }, 100); // Simulate network delay
});

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// For any other routes, serve index.html for SPA
app.get('*', (req, res) => {
  const indexPath = path.join(buildDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Fallback response
    res.send('<h1>Painting Service App</h1><p>Frontend is running but index.html not found</p>');
  }
});

// Start frontend server
const server = app.listen(PORT, () => {
  console.log(`🌐 Frontend server is running on http://localhost:${PORT}`);
  console.log('\n✅ Development environment started successfully!');
  console.log('🌐 Frontend: http://localhost:3001 (served by Express)');
  console.log('🚀 Backend: Please run "npm run dev:server" in another terminal');
  console.log('⏹️  Use Ctrl+C to stop the server');

  console.log('\n💡 To get full development experience:');
  console.log('   1. Terminal 1: npm run dev (this server)');
  console.log('   2. Terminal 2: npm run dev:server (backend with auto-reload)');
});

// Handle process termination
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.close();
  process.exit(0);
});