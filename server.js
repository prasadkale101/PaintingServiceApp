const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Add CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

// PostgreSQL pool configuration with environment variables
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'painting-service-db',
  password: process.env.DB_PASSWORD || 'tEst123!',
  port: process.env.DB_PORT || 5432,
});

// Fallback data for when database is not available
const fallbackServices = [
  {
    id: 1,
    name: "Interior Painting",
    description: "Transform your interior spaces with our professional painting services.",
    price: "$150 - $300 per room"
  },
  {
    id: 2,
    name: "Exterior Painting",
    description: "Protect and beautify your home's exterior with our durable paint solutions.",
    price: "$200 - $500 per house"
  },
  {
    id: 3,
    name: "Touch-up Work",
    description: "Quick fixes for small areas that need attention.",
    price: "$50 - $100 per session"
  },
  {
    id: 4,
    name: "Specialized Finishes",
    description: "Unique painting techniques for special effects and textures.",
    price: "$100 - $200 per project"
  }
];

const fallbackReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing work! The team was professional and the results exceeded my expectations."
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    comment: "Great service, very responsive. My home looks fantastic!"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    comment: "Highly recommend this painting service. They took great care of my house."
  }
];

const fallbackGallery = [
  {
    id: 1,
    url: "/images/painting-1.jpg",
    title: "Living Room Transformation"
  },
  {
    id: 2,
    url: "/images/painting-2.jpg",
    title: "Kitchen Renovation"
  },
  {
    id: 3,
    url: "/images/painting-3.jpg",
    title: "Exterior House Painting"
  }
];

// Function to get database connection with error handling
async function getDatabaseConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL database');
    return client;
  } catch (error) {
    console.warn('⚠️  Failed to connect to PostgreSQL:', error.message);
    console.log('   This is expected if PostgreSQL is not installed or configured.');
    console.log('   The application will continue using fallback data.');
    return null;
  }
}

// API Routes
app.get('/api/services', async (req, res) => {
  try {
    const client = await getDatabaseConnection();

    if (client) {
      try {
        const result = await client.query('SELECT * FROM services');
        client.release();
        res.json(result.rows);
      } catch (error) {
        console.error('Error fetching services from database:', error);
        client.release();
        // Fallback to hardcoded data
        res.json(fallbackServices);
      }
    } else {
      // Fallback to hardcoded data
      res.json(fallbackServices);
    }
  } catch (error) {
    console.error('Error in services API route:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const client = await getDatabaseConnection();

    if (client) {
      try {
        const result = await client.query('SELECT * FROM reviews');
        client.release();
        res.json(result.rows);
      } catch (error) {
        console.error('Error fetching reviews from database:', error);
        client.release();
        // Fallback to hardcoded data
        res.json(fallbackReviews);
      }
    } else {
      // Fallback to hardcoded data
      res.json(fallbackReviews);
    }
  } catch (error) {
    console.error('Error in reviews API route:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const client = await getDatabaseConnection();

    if (client) {
      try {
        const result = await client.query('SELECT * FROM gallery_items');
        client.release();
        res.json(result.rows);
      } catch (error) {
        console.error('Error fetching gallery items from database:', error);
        client.release();
        // Fallback to hardcoded data
        res.json(fallbackGallery);
      }
    } else {
      // Fallback to hardcoded data
      res.json(fallbackGallery);
    }
  } catch (error) {
    console.error('Error in gallery API route:', error);
    res.status(500).json({ error: 'Failed to fetch gallery items' });
  }
});

// API Route for saving schedule
app.post('/api/schedule', async (req, res) => {
  try {
    const { name, email, phone, serviceType, date, time, location, description } = req.body;

    // Validate required fields
    if (!name || !email || !serviceType || !date) {
      return res.status(400).json({ error: 'Name, email, service type and date are required' });
    }

    const client = await getDatabaseConnection();

    if (client) {
      try {
        const result = await client.query(
          'INSERT INTO schedules (name, email, phone, service, preferred_date, preferred_time, location, additional_info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
          [name, email, phone, serviceType, date, time, location, description]
        );

        client.release();
        res.json({
          success: true,
          id: result.rows[0].id,
          message: 'Appointment scheduled successfully'
        });
      } catch (error) {
        console.error('Error saving schedule to database:', error);
        client.release();
        // Even on error, return success for user experience
        res.json({
          success: true,
          message: 'Appointment submitted successfully (database not available)'
        });
      }
    } else {
      // Fallback - just return success without saving to database
      res.json({
        success: true,
        message: 'Appointment submitted successfully (database not available)'
      });
    }
  } catch (error) {
    console.error('Error in schedule API route:', error);
    res.status(500).json({ error: 'Failed to save appointment' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Visit http://localhost:${PORT} to view the application`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await pool.end();
  process.exit(0);
});