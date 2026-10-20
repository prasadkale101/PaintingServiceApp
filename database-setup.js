// Simple database setup script for our painting service app
const { Client } = require('pg');

// Database connection configuration with environment variables
const client = new Client({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'painting-service-db',
  password: process.env.DB_PASSWORD || 'tEst123!',
  port: process.env.DB_PORT || 5432,
});

async function setupDatabase() {
  console.log('🚀 Starting database setup...');

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL database');

    // Create services table
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price VARCHAR(100)
      )
    `);
    console.log('✅ Services table created/verified');

    // Create reviews table
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT
      )
    `);
    console.log('✅ Reviews table created/verified');

    // Create gallery items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS gallery_items (
        id SERIAL PRIMARY KEY,
        url VARCHAR(255) NOT NULL,
        title VARCHAR(255)
      )
    `);
    console.log('✅ Gallery items table created/verified');

    // Create schedules table
    await client.query(`
      CREATE TABLE IF NOT EXISTS schedules (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        service VARCHAR(100) NOT NULL,
        preferred_date TIMESTAMP NOT NULL,
        additional_info TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Schedules table created/verified');

    // Insert sample data into services
    await client.query(`
      INSERT INTO services (name, description, price) VALUES
        ('Interior Painting', 'Transform your interior spaces with our professional painting services.', '$150 - $300 per room'),
        ('Exterior Painting', 'Protect and beautify your home''s exterior with our durable paint solutions.', '$200 - $500 per house'),
        ('Touch-up Work', 'Quick fixes for small areas that need attention.', '$50 - $100 per session'),
        ('Specialized Finishes', 'Unique painting techniques for special effects and textures.', '$100 - $200 per project')
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Sample data inserted into services table');

    // Insert sample data into reviews
    await client.query(`
      INSERT INTO reviews (name, rating, comment) VALUES
        ('Sarah Johnson', 5, 'Amazing work! The team was professional and the results exceeded my expectations.'),
        ('Michael Chen', 4, 'Great service, very responsive. My home looks fantastic!'),
        ('Emily Rodriguez', 5, 'Highly recommend this painting service. They took great care of my house.')
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Sample data inserted into reviews table');

    // Insert sample data into gallery items
    await client.query(`
      INSERT INTO gallery_items (url, title) VALUES
        ('/images/painting-1.jpg', 'Living Room Transformation'),
        ('/images/painting-2.jpg', 'Kitchen Renovation'),
        ('/images/painting-3.jpg', 'Exterior House Painting')
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Sample data inserted into gallery items table');

    console.log('\n🎉 Database setup completed successfully!');
    console.log('You can now use the application with database integration.');

  } catch (err) {
    console.error('\n❌ Error setting up database:', err.message);
    console.log('\n💡 This might be expected if PostgreSQL is not installed or configured properly.');
    console.log('   The application will continue to work with fallback data.');
    console.log('\n🔧 To set up PostgreSQL:');
    console.log('   1. Install PostgreSQL on your system');
    console.log('   2. Create a database named "painting-service-db"');
    console.log('   3. Update your environment variables if needed');
    console.log('   4. Run this setup script again');
  } finally {
    try {
      await client.end();
      console.log('\n🔒 Database connection closed.');
    } catch (endError) {
      console.error('Error closing database connection:', endError.message);
    }
  }
}

setupDatabase();