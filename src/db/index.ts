// Database utilities
import { Client } from 'pg';

// Create and export PostgreSQL client instance
const db = new Client({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'painting-service-db',
  password: process.env.DB_PASSWORD || 'tEst123!',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Connect to database on startup
db.connect()
  .then(() => console.log('✅ Connected to PostgreSQL database'))
  .catch(err => console.error('❌ Database connection error:', err));

export { db };