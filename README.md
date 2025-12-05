```
NextRead – Full Stack MERN Application

NextRead is a complete MERN (MongoDB, Express, React, Node.js) application featuring secure user authentication, protected API routes, and a responsive frontend interface. The platform enables users to register, log in, and access personalized content through JWT-based authentication using HTTP-only cookies.

Features :

Authentication :-

-> User registration
-> Secure login with password hashing
-> JWT-based authentication
-> HTTP-only cookie storage
-> Protected user route (/me)


Frontend :- 

-> React with Vite
-> Modular and reusable components
-> Search and filtering functionality
-> Responsive user interface

Backend :-

-> Node.js with Express
-> MongoDB integration via Mongoose
-> Password hashing using bcrypt
->  Secure cookie management
-> Middleware-based route protection 

Tech Stack:

Frontend :-

-> React
-> Vite
-> Axios
-> CSS 
-> React Icons


Backend :-

-> Node.js
-> Express
-> Mongoose
-> JWT
-> bcrypt
-> cookie-parser
-> CORS


Database :-

-> MongoDB (local or MongoDB Atlas)

Project Structure
NextRead/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.png
│   │   ├── components/
│   │   │   ├── Card.jsx
│   │   │   └── header.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Saved.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── node_modules/
│
├── server/
│   ├── models/
│   │   └── User.js
│   ├── node_modules/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── LICENSE
├── README.md
└── Update.txt

Backend Setup :

Install Dependencies :-
cd backend
npm install

Environment Variables :-

Create a .env file inside the backend directory:
MONGO_URI=your-mongodb-connection-uri
JWT_SECRET=your-secret-key

Start Backend Server :-
npm start


Backend will be available at:
http://localhost:3001

Frontend Setup:

Install Dependencies :-
cd frontend
npm install

Start Frontend :-
npm run dev


Frontend will run on:
http://localhost:5173

API Endpoints :-
Authentication Routes
Method	Route	Description
POST	/register	Register a new user
POST	/login	Log in and receive JWT cookie
GET	/me	Retrieve authenticated user information
POST	/logout	Log out and clear authentication cookie
Deployment Guide
Frontend (Vercel or Netlify)


Generate the production build:-
npm run build


Deploy the dist/ folder:-

->Backend (Render or Railway)


Use the following start command:
node server.js


Update CORS settings to include the deployed frontend domain:
origin: "https://your-frontend-domain.com"

Contributing:-

-> Fork the repository
-> Create a new branch for your feature or fix
-> Commit changes with clear messages
-> Open a pull request
-> License

This project is released under the MIT License.
```
