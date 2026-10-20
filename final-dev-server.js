// Final, complete development server for Painting Service App
// Add dotenv support
const path = require('path');
const fs = require('fs');


function validateScheduleInput(body) {
  const errors = [];
  const requiredFields = [
    'name',
    'email',
    'phone',
    'serviceType',
    'date',
    'time',
    'location',
  ];
  requiredFields.forEach(field => {
    if (!body[field]) {
      errors.push(`${field} is required`);
    }
  });

  // Email validation
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push('Invalid email format');
  }

  // Phone validation (optional – uncomment if needed)
  if (body.phone && !/^[+]?\d{10,15}$/.test(body.phone)) {
    errors.push('Invalid phone number format');
  }

  // Date validation
  if (body.date && isNaN(Date.parse(body.date))) {
    errors.push('Invalid date format');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET /api/estimates/:scheduleId - get estimates for a specific schedule
app.get('/api/estimates/:scheduleId', async (req, res) => {
  const { scheduleId } = req.params;
  try {
    const estimates = await prisma.estimate.findMany({
      where: { schedule_id: parseInt(scheduleId) }
    });
    res.json(estimates);
  } catch (err) {
    console.error('Error fetching estimates:', err);
    res.status(500).json({ error: 'Failed to fetch estimates' });
  }
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

// GET /api/schedule - fetch all schedule requests
app.get('/api/schedule', async (req, res) => {
  try {
    console.log('Fetching schedules from database...');

    // Test database connection
    await prisma.$connect();
    console.log('Database connection successful');

    const schedules = await prisma.schedule.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    console.log('Successfully fetched schedules:', schedules.length);
    res.json(schedules);
  } catch (err) {
    console.error('Error fetching schedules:', err);
    res.status(500).json({ error: 'Failed to fetch schedules', details: err.message });
  }
});

app.post('/api/schedule', async (req, res) => {
  console.log('Schedule request:', req.body);
  const { body } = req;
  const { valid, errors } = validateScheduleInput(body);
  if (!valid) {
    return res.status(400).json({ error: errors.join('; ') });
  }

  try {
    const newSchedule = await prisma.schedule.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        service: body.serviceType,
        preferred_date: new Date(body.date),
        preferred_time: body.time,
        location: body.location,
        additional_info: body.description || null,
      },
    });
    res.status(201).json(newSchedule);
  } catch (err) {
    console.error('Schedule error:', err);
    res.status(500).json({ error: 'Failed to schedule service' });
  }
});

// POST /api/reviews - new route for adding reviews
app.post('/api/reviews', async (req, res) => {
  const { name, rating, comment } = req.body;
  if (!name || !rating || !comment) {
    return res.status(400).json({ error: 'Name, rating, and comment are required' });
  }
  try {
    const newReview = await prisma.review.create({
      data: { name, rating, comment },
    });
    res.status(201).json(newReview);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ error: 'Failed to create review' });
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
