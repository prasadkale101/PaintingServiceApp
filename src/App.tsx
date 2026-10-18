import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Service } from './types';
import { Review } from './types';
import AddReview from './AddReview';
import AdminSection from './AdminSection';

// Home Component
const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Fetch services
        const servicesResponse = await fetch('/api/services');
        if (!servicesResponse.ok) {
          throw new Error('Failed to fetch services');
        }
        const servicesData = await servicesResponse.json();
        setServices(servicesData);

        // Fetch reviews
        const reviewsResponse = await fetch('/api/reviews');
        if (!reviewsResponse.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching home data:', err);
        // Just set loading to false, don't try to set error state
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
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
              <h3>Loading...</h3>
              <p>Please wait while we load our services.</p>
            </div>
            <div className="service-card">
              <h3>Loading...</h3>
              <p>Please wait while we load our services.</p>
            </div>
            <div className="service-card">
              <h3>Loading...</h3>
              <p>Please wait while we load our services.</p>
            </div>
          </div>
        </section>

        <section className="reviews-preview">
          <h2>Customer Reviews</h2>
          <div className="reviews-grid">
            <div className="review-card">
              <h4>Loading...</h4>
              <div className="rating">★★★★★</div>
              <p>Please wait while we load customer reviews.</p>
            </div>
            <div className="review-card">
              <h4>Loading...</h4>
              <div className="rating">★★★★★</div>
              <p>Please wait while we load customer reviews.</p>
            </div>
            <div className="review-card">
              <h4>Loading...</h4>
              <div className="rating">★★★★★</div>
              <p>Please wait while we load customer reviews.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Get top 3 services (or all if less than 3)
  const topServices = services.slice(0, 3);

  // Get top 3 reviews (or all if less than 3)
  const topReviews = reviews.slice(0, 3);

  return (
    <div className="home">
      <section className="hero">
        <h2>Welcome to Our Painting Services</h2>
        <p>Professional painting solutions for your home and business needs.</p>
      </section>

      <section className="services-preview">
        <h2>Our Services</h2>
        <div className="services-grid">
          {topServices.map((service) => (
            <div key={service.id} className="service-card">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p className="price">{service.price}</p>
            </div>
          ))}
        </div>
        <Link to="/services" className="btn">View All Services</Link>
      </section>

      <section className="reviews-preview">
        <h2>Customer Reviews</h2>
        <div className="reviews-grid">
          {topReviews.map((review) => (
            <div key={review.id} className="review-card">
              <h4>{review.name}</h4>
              <div className="rating">
                {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
        <Link to="/reviews" className="btn">View All Reviews</Link>
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
        <Link to="/gallery" className="btn">View Gallery</Link>
      </section>

    </div>
  );
};

// Services Component
const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="services">
        <h2>All Services</h2>
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div className="services">
      <h2>All Services</h2>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p className="price">{service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reviews Component
const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="reviews">
        <h2>All Customer Reviews</h2>
        <p>Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="reviews">
      <h2>All Customer Reviews</h2>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <h4>{review.name}</h4>
            <div className="rating">
              {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
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

// Schedule Component
const Schedule = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to schedule service');
      }

      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        date: '',
        time: '',
        location: '',
        description: ''
      });
    } catch (err: any) {
      console.error('Error scheduling service:', err);
      setSubmitError('Failed to schedule service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="schedule">
      <h2>Schedule Service</h2>
      {submitSuccess ? (
        <div className="success-message">
          <p>Thank you! Your service request has been submitted successfully.</p>
          <p>We will contact you shortly to confirm your appointment.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="schedule-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="serviceType">Service Type *</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>
              {/* Add options dynamically if needed */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Preferred Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Preferred Time *</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Additional Info</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {submitError && <p className="error-message">{submitError}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Schedule Service'}
          </button>
        </form>
      )}
    </div>
  );
};

// Contact Component
const Contact = () => {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <p>For inquiries, please email us at contact@paintingservice.com.</p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <img src="/images/logo.jpg" alt="Painting Services Logo" className="logo" />
            <h1>Painting Services</h1>
          </div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/schedule">Schedule Service</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/add-review">Add Review</Link></li>
              <li><Link to="/admin-section">Admin</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-review" element={<AddReview />} />
            <Route path="/admin-section" element={<AdminSection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;