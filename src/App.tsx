import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Painting Service App</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/schedule">Schedule</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2026 Painting Service App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

// Home Component
const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h2>Welcome to Our Painting Services</h2>
        <p>Professional painting solutions for your home and business needs.</p>
      </section>

      <section className="services-preview">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Interior Painting</h3>
            <p>Transform your interior spaces with our professional painting services.</p>
            <p className="price">$150 - $300 per room</p>
          </div>
          <div className="service-card">
            <h3>Exterior Painting</h3>
            <p>Protect and beautify your home's exterior with our durable paint solutions.</p>
            <p className="price">$200 - $500 per house</p>
          </div>
          <div className="service-card">
            <h3>Touch-up Work</h3>
            <p>Quick fixes for small areas that need attention.</p>
            <p className="price">$50 - $100 per session</p>
          </div>
        </div>
        <Link to="/services" className="btn">View All Services</Link>
      </section>

      <section className="reviews-preview">
        <h2>Customer Reviews</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <h4>Sarah Johnson</h4>
            <div className="rating">★★★★★</div>
            <p>Amazing work! The team was professional and the results exceeded my expectations.</p>
          </div>
          <div className="review-card">
            <h4>Michael Chen</h4>
            <div className="rating">★★★★☆</div>
            <p>Great service, very responsive. My home looks fantastic!</p>
          </div>
          <div className="review-card">
            <h4>Emily Rodriguez</h4>
            <div className="rating">★★★★★</div>
            <p>Highly recommend this painting service. They took great care of my house.</p>
          </div>
        </div>
        <Link to="/gallery" className="btn">View All Reviews</Link>
      </section>

      <section className="gallery-preview">
        <h2>Photo Gallery</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="/images/painting-1.jpg" alt="Living Room Transformation" />
            <p>Living Room Transformation</p>
          </div>
          <div className="gallery-item">
            <img src="/images/painting-2.jpg" alt="Kitchen Renovation" />
            <p>Kitchen Renovation</p>
          </div>
          <div className="gallery-item">
            <img src="/images/painting-3.jpg" alt="Exterior House Painting" />
            <p>Exterior House Painting</p>
          </div>
        </div>
        <Link to="/gallery" className="btn">View Full Gallery</Link>
      </section>
    </div>
  );
};

// Services Component
const Services = () => {
  return (
    <div className="services">
      <h2>Our Painting Services</h2>
      <div className="services-grid">
        <div className="service-card">
          <h3>Interior Painting</h3>
          <p>Transform your interior spaces with our professional painting services.</p>
          <p className="price">$150 - $300 per room</p>
        </div>
        <div className="service-card">
          <h3>Exterior Painting</h3>
          <p>Protect and beautify your home's exterior with our durable paint solutions.</p>
          <p className="price">$200 - $500 per house</p>
        </div>
        <div className="service-card">
          <h3>Touch-up Work</h3>
          <p>Quick fixes for small areas that need attention.</p>
          <p className="price">$50 - $100 per session</p>
        </div>
        <div className="service-card">
          <h3>Specialized Finishes</h3>
          <p>Unique painting techniques for special effects and textures.</p>
          <p className="price">$100 - $200 per project</p>
        </div>
      </div>
    </div>
  );
};

// Schedule Component
const Schedule = () => {
  return (
    <div className="schedule">
      <h2>Schedule an Appointment</h2>
      <form className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
        <div className="form-group">
          <label htmlFor="service">Service:</label>
          <select id="service" name="service" required>
            <option value="">Select a service</option>
            <option value="interior">Interior Painting</option>
            <option value="exterior">Exterior Painting</option>
            <option value="touchup">Touch-up Work</option>
            <option value="specialized">Specialized Finishes</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Preferred Date:</label>
          <input type="date" id="date" name="date" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Additional Information:</label>
          <textarea id="message" name="message" rows={4}></textarea>
        </div>
        <button type="submit" className="btn">Submit Request</button>
      </form>
    </div>
  );
};

// About Component
const About = () => {
  return (
    <div className="about">
      <h2>About Our Company</h2>
      <p>
        We are a professional painting service company with over 10 years of experience
        in transforming homes and businesses. Our team of skilled painters uses high-quality
        materials and techniques to deliver exceptional results.
      </p>
      <h3>Contact Information</h3>
      <ul>
        <li>Phone: (555) 123-4567</li>
        <li>Email: info@paintingservice.com</li>
        <li>Address: 123 Painting Street, Art City</li>
      </ul>
    </div>
  );
};

// Gallery Component
const Gallery = () => {
  return (
    <div className="gallery">
      <h2>Photo Gallery</h2>
      <div className="gallery-grid">
        <div className="gallery-item">
          <img src="/images/painting-1.jpg" alt="Living Room Transformation" />
          <p>Living Room Transformation</p>
        </div>
        <div className="gallery-item">
          <img src="/images/painting-2.jpg" alt="Kitchen Renovation" />
          <p>Kitchen Renovation</p>
        </div>
        <div className="gallery-item">
          <img src="/images/painting-3.jpg" alt="Exterior House Painting" />
          <p>Exterior House Painting</p>
        </div>
      </div>
    </div>
  );
};

export default App;