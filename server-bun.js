const express = require('express');
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

const app = express();
const PORT = process.env.PORT || 3001; // Changed to port 3001

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

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
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/schedule
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

// Serve the React app for all other routes - this should be last
app.get('*', (req, res) => {
  console.log(`Serving index.html for route: ${req.path}`);
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  console.log('🌐 API Endpoints available:');
  console.log('   - GET /api/services');
  console.log('   - GET /api/reviews');
  console.log('   - POST /api/schedule');
  console.log('   - POST /api/reviews');
  console.log('   - All other routes serve React app');
});

module.exports = app;

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});