# Quick Start Guide

## Prerequisites

1. **Node.js**: Version 14.0.0 or higher
2. **MongoDB**: Running instance required

## MongoDB Setup

### Option 1: Install MongoDB Locally

#### macOS (using Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Ubuntu/Debian
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Windows
Download and install from: https://www.mongodb.com/try/download/community

### Option 2: Use MongoDB Atlas (Cloud)
1. Create a free account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get your connection string
4. Set environment variable:
   ```bash
   export APOS_MONGODB_URI="your-mongodb-atlas-connection-string"
   ```

### Option 3: Use Docker
```bash
docker run --name mongodb -p 27017:27017 -d mongo:latest
```

## Starting the Application

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB** (if running locally):
   ```bash
   # Make sure MongoDB is running on port 27017
   mongod
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

4. **Visit your site:**
   - Open http://localhost:3000 in your browser
   - Visit http://localhost:3000/login to access admin panel

## First Time Setup

1. Navigate to http://localhost:3000/login
2. Create your first admin user account
3. Use the admin bar to create and edit content
4. Create your first article by going to "Articles" in the admin bar

## Development

For development with auto-restart:
```bash
npm run dev
```

## Troubleshooting

### "MongoServerSelectionError: connect ECONNREFUSED"
- MongoDB is not running
- Start MongoDB service or check connection string

### "Cannot find module 'apostrophe'"
- Run `npm install` to install dependencies

### Port 3000 already in use
- Use environment variable: `PORT=3001 npm start`