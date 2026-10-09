const express = require('express');
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

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

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  console.log('🌐 API Endpoints available:');
  console.log('   - GET /api/services');
  console.log('   - GET /api/reviews');
  console.log('   - All other routes serve React app');
});

module.exports = app;

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});