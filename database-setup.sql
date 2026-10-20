-- Create services table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price VARCHAR(100)
);

-- Create reviews table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL
);

-- Create gallery_items table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS gallery_items (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL
);

-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    service VARCHAR(100) NOT NULL,
    preferred_date DATE NOT NULL,
    additional_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create estimates table
CREATE TABLE IF NOT EXISTS estimates (
    id SERIAL PRIMARY KEY,
    schedule_id INTEGER REFERENCES schedules(id) ON DELETE CASCADE,
    amount VARCHAR(100) NOT NULL,
    description TEXT
);

-- Insert sample data for services table (if empty)
INSERT INTO services (name, description, price) VALUES
('Interior Painting', 'Transform your interior spaces with our professional painting services.', '$150 - $300 per room'),
('Exterior Painting', 'Protect and beautify your home''s exterior with our durable paint solutions.', '$200 - $500 per house'),
('Touch-up Work', 'Quick fixes for small areas that need attention.', '$50 - $100 per session'),
('Specialized Finishes', 'Unique painting techniques for special effects and textures.', '$100 - $200 per project')
ON CONFLICT (id) DO NOTHING;

-- Insert sample data for reviews table (if empty)
INSERT INTO reviews (name, rating, comment) VALUES
('Sarah Johnson', 5, 'Amazing work! The team was professional and the results exceeded my expectations.'),
('Michael Chen', 4, 'Great service, very responsive. My home looks fantastic!'),
('Emily Rodriguez', 5, 'Highly recommend this painting service. They took great care of my house.')
ON CONFLICT (id) DO NOTHING;

-- Insert sample data for gallery_items table (if empty)
INSERT INTO gallery_items (url, title) VALUES
('/images/painting-1.jpg', 'Living Room Transformation'),
('/images/painting-2.jpg', 'Kitchen Renovation'),
('/images/painting-3.jpg', 'Exterior House Painting')
ON CONFLICT (id) DO NOTHING;

-- Insert sample data for estimates table (if empty)
INSERT INTO estimates (schedule_id, amount, description) VALUES
(1, '$250', 'Interior painting for living room and dining area'),
(2, '$400', 'Exterior painting for front porch and deck')
ON CONFLICT (id) DO NOTHING;