# Job Board Application

A modern job board platform built with React and Node.js that allows companies to post job opportunities and candidates to apply for positions.

## 🚀 Features

- **Job Posting**: Companies can create and manage job listings
- **Job Applications**: Candidates can apply for jobs with detailed forms
- **User Authentication**: Secure authentication using Clerk
- **Dashboard**: Company dashboard for managing jobs and applications
- **Rich Text Editor**: Job descriptions with Quill editor
- **File Upload**: Support for resume and document uploads via Cloudinary
- **Responsive Design**: Modern UI built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications
- **Quill** - Rich text editor for job descriptions
- **Clerk** - Authentication and user management
- **Moment.js** - Date formatting and manipulation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling
- **Cloudinary** - Cloud storage for file uploads
- **Clerk** - Authentication middleware
- **Sentry** - Error monitoring and performance tracking
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context for state management
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json       # Frontend dependencies
├── server/                # Backend Node.js application
│   ├── config/           # Database and service configurations
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API route definitions
│   ├── utils/           # Utility functions
│   └── package.json     # Backend dependencies
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Clerk account for authentication
- Cloudinary account for file storage

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-board-app
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Environment Setup**

   Create `.env` files in both client and server directories:

   **Server (.env)**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLERK_SECRET_KEY=your_clerk_secret_key
   SENTRY_DSN=your_sentry_dsn
   ```

   **Client (.env)**
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

5. **Start the development servers**

   **Start the backend server**
   ```bash
   cd server
   npm run server
   ```

   **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```

   The application will be available at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📋 API Endpoints

### Companies
- `GET /api/company` - Get all companies
- `POST /api/company` - Create a new company
- `GET /api/company/:id` - Get company by ID
- `PUT /api/company/:id` - Update company
- `DELETE /api/company/:id` - Delete company

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create a new job
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

## 🎯 Features in Detail

### For Companies
- Create and manage job postings
- View and manage job applications
- Dashboard for analytics and insights
- Rich text editor for job descriptions
- File upload for company documents

### For Job Seekers
- Browse available job opportunities
- Apply for jobs with detailed forms
- Track application status
- Upload resumes and cover letters
- Search and filter jobs

## 🔧 Development

### Available Scripts

**Frontend (client/)**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

**Backend (server/)**
- `npm run server` - Start development server with nodemon
- `npm start` - Start production server

## 🚀 Deployment

The application is configured for deployment on Vercel:

- Frontend: Configured with `vercel.json` for Vercel deployment
- Backend: Configured with `vercel.json` for serverless functions

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.