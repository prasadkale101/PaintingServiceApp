# Painting Service Application

This is a full-stack web application for managing painting services built with React, TypeScript, and Express.

## Features

- Multi-page React application with routing
- RESTful API endpoints for services, reviews, and gallery
- Responsive design using CSS Grid and Flexbox
- TypeScript type safety
- Static file serving with Express.js
- Admin authentication system

## Admin Authentication

The Admin section is protected with a static username and password:

- **Username:** admin
- **Password:** password123

When accessing the Admin section, users will be redirected to a login page where they must enter these credentials. After successful authentication, they will be granted access to the Admin section. Users can logout at any time using the logout button in the Admin section.

## How to Run

1. Install dependencies: `npm install`
2. Development mode: `npm run dev` (hot reloading)
3. Production build: `npm run build && npm start`

## Project Structure

```
.
├── src/                 # React application source code
│   ├── App.tsx          # Main application component  
│   ├── index.tsx        # Entry point
│   ├── index.css        # Styles
│   ├── Login.tsx        # Login component
│   └── AdminSection.tsx # Admin section component
├── public/              # Static files
│   └── index.html       # HTML template
├── server.js            # Express server
├── webpack.config.js    # Webpack configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── README.md            # Documentation
```

## API Endpoints

- `GET /api/services` - Get list of painting services
- `GET /api/reviews` - Get customer reviews
- `GET /api/gallery` - Get photo gallery items

## Documentation References

This project was built using up-to-date documentation from Context7 for:
- React development best practices
- Express.js API design
- TypeScript configuration and type safety
- Webpack bundling strategies