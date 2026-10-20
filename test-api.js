// Simple test to verify API endpoints work
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());

// Test the schedule endpoint directly
app.get('/api/schedule', async (req, res) => {
  try {
    console.log('Fetching schedules from database...');
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

// Test the POST endpoint
app.post('/api/schedule', async (req, res) => {
  try {
    console.log('Creating new schedule:', req.body);
    const newSchedule = await prisma.schedule.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        service: req.body.serviceType,
        preferred_date: new Date(req.body.date),
        preferred_time: req.body.time,
        location: req.body.location,
        additional_info: req.body.description || null,
      },
    });
    console.log('Successfully created schedule:', newSchedule.id);
    res.status(201).json(newSchedule);
  } catch (err) {
    console.error('Schedule error:', err);
    res.status(500).json({ error: 'Failed to schedule service' });
  }
});

console.log('Testing API endpoints directly...');
console.log('Run this test with: node test-api.js');