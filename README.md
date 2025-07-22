# Developer Task Manager

A full-stack MERN application for managing tasks with role-based access control.

## Features

- **User Authentication** - JWT-based signup/login
- **Role-Based Dashboards** - Separate admin and developer views
- **Task Management** - Create, read, update, delete tasks
- **Admin Controls** - Admins can manage all users' tasks
- **Developer Access** - Developers can only manage their own tasks
- **Responsive UI** - Built with React and Tailwind CSS
- **Dark Mode** - Theme toggle support

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Radix UI
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT tokens with bcrypt
- **UI Components:** Shadcn/ui components

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd developer-task-manager
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   pnpm install

   # Install client dependencies
   cd ../client
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/devtaskdb
   JWT_SECRET=supersecretkey123
   ```

4. **Start MongoDB**
   ```bash
   sudo systemctl start mongod
   ```

5. **Start the application**
   ```bash
   # Start server (from server directory)
   pnpm dev
   # or
   pnpm start

   # Start client (from client directory, in a new terminal)
   pnpm dev
   ```

## Usage

### Access the Application
- **Client:** http://localhost:5173
- **Server API:** http://localhost:5000

### Default Admin Account
- **Username:** admin
- **Email:** admin@example.com
- **Password:** admin123

### Creating Admin User
If you need to create an admin user, run this script in the server directory:
```bash
node -e "
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await User.create({
    username: 'admin',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin'
  });
  console.log('Admin user created!');
  process.exit(0);
}).catch(console.error);
"
```

### User Roles
- **Admin:** Can view and manage all users' tasks
- **Developer:** Can only manage their own tasks

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── utils/       # Utility functions
│   └── package.json
├── server/          # Express backend
│   ├── controllers/ # Route handlers
│   ├── middleware/  # Authentication middleware
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks/me` - Get user's tasks
- `GET /api/tasks/all` - Get all tasks (admin only)
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
