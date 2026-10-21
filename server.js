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
const PORT = process.env.PORT || 3000;

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

// GET /api/schedules/:id - fetch a single schedule by ID
app.get('/api/schedules/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await prisma.schedule.findUnique({
      where: { id: parseInt(id) }
    });

    if (!schedule) {
      res.status(404).json({ error: 'Schedule not found' });
      return;
    }

    res.json(schedule);
  } catch (err) {
    console.error('Error fetching schedule:', err);
    res.status(500).json({ error: 'Failed to fetch schedule' });
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

// POST /api/estimates - new route for adding estimates
app.post('/api/estimates', async (req, res) => {
  const { scheduleId, estimateAmount, briefDescription } = req.body;
  if (!scheduleId || !estimateAmount) {
    return res.status(400).json({ error: 'scheduleId and estimateAmount are required' });
  }
  try {
    const newEstimate = await prisma.estimate.create({
      data: {
        schedule_id: scheduleId,
        estimateAmount: String(estimateAmount),
        briefDescription: briefDescription || null
      },
    });
    res.status(201).json(newEstimate);
  } catch (err) {
    console.error('Error creating estimate:', err);
    res.status(500).json({ error: 'Failed to create estimate' });
  }
});

// PUT /api/estimates/:scheduleId - update estimate for a specific schedule
app.put('/api/estimates/:scheduleId', async (req, res) => {
  const { scheduleId } = req.params;
  const { estimateAmount, briefDescription } = req.body;

  if (!estimateAmount) {
    return res.status(400).json({ error: 'estimateAmount is required' });
  }

  try {
    const updatedEstimate = await prisma.estimate.update({
      where: { schedule_id: parseInt(scheduleId) },
      data: {
        estimateAmount,
        briefDescription: briefDescription || null
      }
    });
    res.json(updatedEstimate);
  } catch (err) {
    console.error('Error updating estimate:', err);
    res.status(500).json({ error: 'Failed to update estimate' });
  }
});

// GET /api/estimates/:scheduleId - get estimate for a specific schedule
app.get('/api/estimates/:scheduleId', async (req, res) => {
  const { scheduleId } = req.params;
  try {
    const estimate = await prisma.estimate.findFirst({
      where: { schedule_id: parseInt(scheduleId) }
    });
    if (!estimate) {
      res.status(404).json({ error: 'Estimate not found' });
      return;
    }
    res.json(estimate);
  } catch (err) {
    console.error('Error fetching estimate:', err);
    res.status(500).json({ error: 'Failed to fetch estimate' });
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