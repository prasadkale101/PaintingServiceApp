const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// API Routes
app.get('/api/services', (req, res) => {
  const services = [
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
  res.json(services);
});

app.get('/api/reviews', (req, res) => {
  const reviews = [
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
  res.json(reviews);
});

app.get('/api/gallery', (req, res) => {
  const images = [
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
  res.json(images);
});

// Serve React app for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});