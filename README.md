# Event Management Dashboard

This project is a full-stack web application for managing events, attendees, and tasks efficiently. It includes a user-friendly frontend and a robust backend with authentication, CRUD operations, and task tracking.

---

## Features

### Frontend
- Event Management Page: Add, edit, delete, and view event details.
- Attendee Management Page: Manage attendees and assign tasks.
- Task Tracker Page: Update and visualize task progress.
- Responsive design for mobile and desktop devices.

### Backend
- RESTful APIs for Event, Attendee, and Task management.
- Authentication using JWT.
- MongoDB integration for persistent data storage.

---

## Tech Stack

### Frontend
- React.js
- Axios
- Bootstrap / Tailwind CSS (for styling)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (Authentication)
- dotenv (Environment variables)

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed
- MongoDB instance running
- node modules installed

### Backend Setup
1. Clone the repository and navigate to the backend folder:
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=<Your MongoDB connection string>
   JWT_SECRET=$(openssl rand -base64 32)
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```
5. The backend will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```
4. The frontend will run on `http://localhost:3000`.

---

## API Endpoints

### Event Management API
- **POST** `/api/events` - Create an event
- **GET** `/api/events` - Retrieve all events
- **PUT** `/api/events/:id` - Update an event
- **DELETE** `/api/events/:id` - Delete an event

### Attendee Management API
- **POST** `/api/attendees` - Add an attendee
- **GET** `/api/attendees` - Retrieve all attendees
- **DELETE** `/api/attendees/:id` - Delete an attendee

### Task Management API
- **POST** `/api/tasks` - Create a task
- **GET** `/api/tasks/:eventId` - Retrieve tasks for an event
- **PUT** `/api/tasks/:id` - Update task status

---

## Testing the Application

1. Use tools like Postman or Insomnia to test API endpoints.
2. Add the following headers for authenticated routes:
   ```json
   {
     "Authorization": "Bearer <your JWT token>",
     "Content-Type": "application/json"
   }
   ```
3. To generate a JWT token, log in using the authentication route `/api/auth/login` and retrieve the token from the response.

---

## Contribution

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
