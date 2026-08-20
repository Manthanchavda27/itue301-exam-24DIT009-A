# Library Book Management System
ITUE301 — Advanced Web Development Frameworks | Set B

## Project Structure
```
├── frontend/    → React Frontend (Vite)
├── backend/     → Express.js Backend
├── .env.example
└── README.md
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs at: http://localhost:5173

## Backend Setup
```bash
cd backend
npm install
npm start
```
Runs at: http://localhost:5000

## MongoDB Setup
- Create a free cluster at https://cloud.mongodb.com
- Copy your connection string

## Environment Variables
Create a `.env` file inside the `backend/` folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## API Endpoints
| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| GET    | /api/v1/books      | Get all books          |
| GET    | /api/v1/borrowings | Get all borrowings     |
| POST   | /api/v1/borrowings | Create a new borrowing |

## Schema Validation Demo
```bash
cd backend
node seed.js
```
