# User Management System – Clarigo

A full-stack User Management System built using **React.js, Node.js, Express.js, and MongoDB**. The application provides user authentication and CRUD operations for managing users through a responsive frontend and RESTful backend APIs.

## 🚀 Tech Stack

### Frontend

* React.js
* JavaScript
* TailwindCSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* REST API

### Tools

* Git & GitHub
* Postman
* VS Code

---

# 📁 Project Structure

```text
user-management-system-clarigo/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

# ✨ Features

## Frontend

* Responsive user interface using React.js
* User registration and login
* User authentication flow
* User list/dashboard
* Add new user
* View user details
* Edit user information
* Delete user
* API integration using Axios
* Client-side form validation
* Protected pages using authentication
* Loading and error handling

## Backend

* RESTful API using Node.js and Express.js
* MongoDB database integration using Mongoose
* User CRUD operations
* User registration and login APIs
* Password hashing using bcrypt
* JWT-based authentication
* Authentication middleware for protected routes
* Request validation
* Error handling
* MongoDB schema/model for users

---

# 🔐 Authentication

The application uses **JWT (JSON Web Token)** for authentication.

### Authentication Flow

```text
User Login
    ↓
Backend verifies email & password
    ↓
Password checked using bcrypt
    ↓
JWT token generated
    ↓
Token sent to frontend
    ↓
Frontend stores token
    ↓
Token sent with protected API requests
    ↓
Authentication middleware verifies token
    ↓
Protected resource accessed
```

---

# 🛠️ Backend API

## Authentication APIs

### Register User

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "Chandrika",
  "email": "chandrika@example.com",
  "password": "123456"
}
```

### Login User

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "chandrika@example.com",
  "password": "123456"
}
```

---

# 👤 User APIs

### Get All Users

```http
GET /api/users
```

### Get User By ID

```http
GET /api/users/:id
```

### Create User

```http
POST /api/users
```

### Update User

```http
PUT /api/users/:id
```

### Delete User

```http
DELETE /api/users/:id
```

Protected APIs require a JWT token:

```http
Authorization: Bearer <token>
```

---

# 🗄️ User Model

The user collection contains fields such as:

```text
name
email
password
```

Passwords are not stored as plain text. They are hashed using **bcrypt** before being stored in MongoDB.

---

# 🔄 CRUD Operations

The backend supports complete CRUD functionality:

```text
Create  → Add a new user
Read    → Get users / user details
Update  → Update user information
Delete  → Remove a user
```

Frontend communicates with these APIs using Axios.

```text
React Frontend
      ↓
    Axios
      ↓
Express REST API
      ↓
Controller
      ↓
Mongoose
      ↓
MongoDB
```

---

# 🌐 Frontend–Backend Integration

The React frontend communicates with the Express backend through REST APIs.

Example:

```javascript
axios.get("/api/users");
```

For authenticated requests:

```javascript
axios.get("/api/users", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Do not commit the actual `.env` file to GitHub.

---

# ▶️ How to Run the Project

## 1. Clone Repository

```bash
git clone https://github.com/ChandrikaVishwakarma369/user-management-system-clarigo.git
```

```bash
cd user-management-system-clarigo
```

## 2. Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

## 3. Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the local Vite development URL shown in the terminal.

---

# 🧪 API Testing

Backend APIs were tested using **Postman**.

Tested operations include:

* User registration
* User login
* Get users
* Get user by ID
* Create user
* Update user
* Delete user
* Protected API requests with JWT

---

# 🛡️ Security

The project implements basic backend security practices:

* Password hashing with bcrypt
* JWT authentication
* Protected API routes
* Environment variables for secrets
* Input validation
* Error handling

---

# 📌 What I Worked On

## Frontend Contribution

* Developed React-based user management interface.
* Created forms for user registration and user management.
* Integrated backend REST APIs using Axios.
* Implemented user CRUD operations from the frontend.
* Added authentication-based access to protected pages.
* Handled API loading, success, and error states.
* Created a responsive and user-friendly interface.

## Backend Contribution

* Developed REST APIs using Node.js and Express.js.
* Designed MongoDB user schema using Mongoose.
* Implemented user CRUD operations.
* Implemented registration and login functionality.
* Added password hashing using bcrypt.
* Implemented JWT authentication.
* Created authentication middleware for protected routes.
* Tested APIs using Postman.
* Added basic validation and error handling.

---

# 📚 Concepts Used

Through this project, the following concepts were implemented:

* React Components
* React Router
* State Management
* API Integration
* Axios
* REST API
* HTTP Methods
* Node.js
* Express.js
* Middleware
* Controllers
* MongoDB
* Mongoose
* CRUD Operations
* JWT
* bcrypt
* Authentication
* Protected Routes
* Error Handling
* Git & GitHub
* Postman API Testing

---

# 🔮 Future Improvements

Possible future improvements:

* Role-based authorization
* Pagination and search
* Advanced form validation
* Admin dashboard
* User profile management
* Password reset functionality
* Refresh token implementation
* Deployment using cloud services

---

# 👩‍💻 Author

**Chandrika Vishwakarma**

* GitHub: [ChandrikaVishwakarma369](https://github.com/ChandrikaVishwakarma369)
* LinkedIn: [Chandrika Vishwakarma](https://www.linkedin.com/in/chandrika-vishwakarma/)
