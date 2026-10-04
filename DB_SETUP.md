# Database Setup Guide

This application supports PostgreSQL database integration. Here's how to set up and use the database.

## Prerequisites

1. PostgreSQL must be installed and running on your system
2. You need a PostgreSQL user with appropriate permissions
3. The default database name is `painting-service-db`

## Setup Process

### 1. Create the Database

If you don't have the database yet, create it:

```bash
createdb painting-service-db
```

Or using psql:
```sql
CREATE DATABASE "painting-service-db";
```

### 2. Run Database Setup Script

Run our automated setup script to create tables and insert sample data:

```bash
npm run setup-db
```

This will:
- Create the necessary tables (services, reviews, gallery_items)
- Insert sample data for each table
- Handle cases where tables already exist

## Testing the Connection

You can test your database connection with:

```bash
node test-db-connection.js
```

## Fallback Behavior

If PostgreSQL is not available or cannot be connected to, the application will automatically fall back to hardcoded sample data, ensuring that the application remains functional.

## Database Schema

The database consists of three main tables:

### Services Table
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255) NOT NULL)
- `description` (TEXT)
- `price` (VARCHAR(100))

### Reviews Table
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255) NOT NULL)
- `rating` (INTEGER NOT NULL)
- `comment` (TEXT)

### Gallery Items Table
- `id` (SERIAL PRIMARY KEY)
- `url` (VARCHAR(255) NOT NULL)
- `title` (VARCHAR(255))

## Configuration

The database connection is configured in `server.js` with default settings:
- User: `postgres`
- Host: `localhost`
- Database: `painting-service-db`
- Port: `5432`

If you need to change these settings, modify the configuration in `server.js`.