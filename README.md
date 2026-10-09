# Painting Service App

A modern, responsive painting service application built with React and Node.js.

## Features

- Responsive web design
- Service listings with pricing
- Customer reviews
- Photo gallery
- Service scheduling
- Contact information

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Start Development Servers

**Terminal 1:**
```bash
npm run dev
```
This starts the frontend development server on `http://localhost:3001`

**Terminal 2:**
```bash
npm run dev:server
```
This starts the backend server with auto-reload on `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
.
├── src/                 # Source code
│   ├── App.tsx          # Main application component
│   ├── index.html       # HTML template
│   └── index.css        # Styles
├── public/              # Static assets
│   └── images/          # Image files
├── server.js            # Backend server
├── final-dev-server.js  # Development server with API endpoints
└── build-client.js      # Client build script
```

## API Endpoints

- `GET /api/services` - Get all painting services
- `GET /api/reviews` - Get customer reviews

## Technologies Used

- React (TypeScript)
- Node.js/Express
- CSS Modules
- React Router
- CORS