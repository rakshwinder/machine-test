# MERN Stack Machine Test

A full-stack **MERN** (MongoDB, Express, React, Node.js) application featuring user authentication, protected routes, a live digital clock, and a recursive hierarchical family tree display.

## Features

- **User Authentication**
  - Register & Login with JWT-based authentication
  - Passwords hashed using `bcryptjs`
  - Protected Dashboard route (only accessible when logged in)

- **Digital Clock**
  - Real-time updating clock displayed on the Dashboard

- **Hierarchical Family Tree**
  - Self-referencing `Person` model in MongoDB
  - Recursive rendering exactly as required




**Terminal 1 - Backend**
```bash
cd backend
cp .env.example .env
npm install
npm run dev



**Terminal 1 - Backend**

  cd frontend
npm install
npm run dev