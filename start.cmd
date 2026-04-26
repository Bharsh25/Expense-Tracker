@echo off
echo Starting Expense Tracker...

echo Starting Backend API on port 5000...
start "Backend Server" cmd /c "cd backend && npm run dev"

echo Starting Frontend on localhost:5173...
start "Frontend Vite Server" cmd /c "cd frontend && npm run dev"

echo Both servers are starting up!
