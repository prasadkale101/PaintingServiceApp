# Painting Service App

A professional painting service website with appointment scheduling functionality.

## Features

- Professional painting services showcase
- Customer reviews and testimonials
- Before/after gallery
- Online appointment scheduling system
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, TypeScript, CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (with fallback to hardcoded data)
- **Build Tools**: Webpack, TypeScript

## Database Setup

The application supports both database and fallback modes:

1. **With Database**:
   - PostgreSQL required
   - Tables will be created automatically if they don't exist
   - Environment variables for database connection:
     - `DB_USER` (default: postgres)
     - `DB_HOST` (default: localhost)
     - `DB_NAME` (default: painting-service-db)
     - `DB_PASSWORD` (default: tEst123!)
     - `DB_PORT` (default: 5432)

2. **Without Database**:
   - Fallback to hardcoded data will be used
   - Application continues to function normally

## API Endpoints

- `GET /api/services` - Get all painting services
- `GET /api/reviews` - Get customer reviews
- `GET /api/gallery` - Get gallery images
- `POST /api/schedule` - Schedule an appointment
- `GET /health` - Health check endpoint

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the root directory with:
```
SERVER_PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=painting-service-db
DB_PASSWORD=tEst123!
DB_PORT=5432
```