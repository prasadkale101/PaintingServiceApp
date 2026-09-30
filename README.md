# Painting Service Application

A full stack web application for managing painting services built with React, TypeScript, and Express.

## Features

- Responsive web interface using React and TypeScript
- RESTful API backend using Express.js
- Home page with service preview, reviews, and photo gallery
- Services page with detailed information
- Appointment scheduling system
- About page with company information
- Photo gallery display

## Project Structure

```
.
├── src/                 # React application source code
│   ├── App.tsx          # Main application component
│   ├── index.tsx        # Entry point
│   └── index.css        # Styles
├── public/              # Static files
│   └── index.html       # HTML template
├── server.js            # Express server
├── webpack.config.js    # Webpack configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Development

To run in development mode with hot reloading:

```
npm run dev
```

This will start both the React development server and Express backend server.

### Production Build

To build for production:

```
npm run build
```

Then start the server:
```
npm start
```

## API Endpoints

- `GET /api/services` - Get list of painting services
- `GET /api/reviews` - Get customer reviews
- `GET /api/gallery` - Get photo gallery items

## Technologies Used

- **Frontend**: React, TypeScript, React Router, CSS
- **Backend**: Express.js, Node.js
- **Build Tools**: Webpack, TypeScript Compiler
- **Development**: concurrently, nodemon, webpack-dev-server

## Contributing

This is a basic implementation of the painting service application. The project can be extended with additional features like:

- User authentication and admin panel
- Database integration (MongoDB/PostgreSQL)
- Image upload functionality
- Appointment management system
- Email notifications