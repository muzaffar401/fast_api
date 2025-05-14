# Task Tracker App

## Overview
This Task Tracker application is a full-stack web application built with FastAPI for the backend and vanilla HTML/CSS/JavaScript for the frontend. It allows users to:
- Create and manage users
- Assign tasks to users
- Track task status (pending, in progress, completed, cancelled)
- View and filter tasks by user

## Project Structure
```
FASTAPI-TASK-TRACKER-APP/
├── .venv/                   # Python virtual environment
├── backend/                 
│   ├── __pycache__/         # Python compiled files
│   └── main.py              # FastAPI backend code
├── frontend/
│   ├── app.js               # Frontend JavaScript
│   ├── index.html           # Frontend HTML
│   └── styles.css           # Frontend CSS
├── task_tracker.db          # SQLite database file
├── pyproject.toml           # Python project configuration
├── python-version           # Python version file
├── README.md                # This documentation file
└── requirements.txt         # Python dependencies
```

## System Architecture Diagram

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│                                Task Tracker App                               │
│                                                                               │
└───────────────────────────────┬───────────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│                                 Frontend (UI)                                 │
│                                                                               │
│  ┌─────────────────────┐    ┌─────────────────────┐    ┌───────────────────┐ │
│  │      User Form      │    │     User List       │    │     Task Form      │ │
│  └─────────────────────┘    └─────────────────────┘    └───────────────────┘ │
│                                                                               │
│  ┌─────────────────────┐    ┌─────────────────────┐                          │
│  │     Task List       │    │   Status Controls   │                          │
│  └─────────────────────┘    └─────────────────────┘                          │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
                                │
                                │  HTTP Requests (REST API)
                                ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│                                 Backend (API)                                 │
│                                                                               │
│  ┌─────────────────────┐    ┌─────────────────────┐    ┌───────────────────┐ │
│  │    User Routes      │    │    Task Routes      │    │  Database Layer    │ │
│  └─────────────────────┘    └─────────────────────┘    └───────────────────┘ │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
                                │
                                │  SQL Queries
                                ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│                              SQLite Database                                  │
│                                                                               │
│  ┌─────────────────────┐    ┌─────────────────────┐                          │
│  │       Users         │    │        Tasks        │                          │
│  └─────────────────────┘    └─────────────────────┘                          │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

## Backend (FastAPI)

### Database Models
1. **User Model**:
   - `id`: Unique identifier (UUID)
   - `username`: Unique username (3-20 characters)
   - `email`: Unique email address
   - `tasks`: Relationship to tasks (one-to-many)

2. **Task Model**:
   - `id`: Unique identifier (UUID)
   - `title`: Task title
   - `description`: Optional task description
   - `due_date`: Task due date (cannot be in the past)
   - `status`: Task status (pending, in_progress, completed, cancelled)
   - `created_at`: Timestamp of creation
   - `user_id`: Foreign key to user

### API Endpoints

#### User Endpoints:
- `POST /users/`: Create a new user
- `GET /users/`: List all users
- `GET /users/{user_id}`: Get a specific user
- `DELETE /users/{user_id}`: Delete a user (and all their tasks)

#### Task Endpoints:
- `POST /tasks/`: Create a new task
- `GET /tasks/{task_id}`: Get a specific task
- `PUT /tasks/{task_id}`: Update task status
- `DELETE /tasks/{task_id}`: Delete a task
- `GET /users/{user_id}/tasks`: List all tasks for a user

### Validation
- Username: 3-20 characters
- Email: Valid email format
- Task due date: Cannot be in the past
- Task status: Must be one of allowed values

## Frontend (HTML/CSS/JS)

### Key Features
1. **User Management**:
   - Create new users
   - View all users in a card layout
   - Delete users
   - Select users for task assignment

2. **Task Management**:
   - Create new tasks with title, description, due date
   - View tasks by user
   - Update task status via dropdown
   - Delete tasks

3. **UI/UX**:
   - Responsive design with Bootstrap
   - Smooth animations for adding/removing items
   - Confirmation dialogs for deletions
   - Status indicators with color coding
   - Form validation

### JavaScript Functions
- `fetchUsers()`: Fetches all users from API
- `createUser()`: Creates a new user
- `deleteUser()`: Deletes a user
- `fetchUserTasks()`: Fetches tasks for a specific user
- `createTask()`: Creates a new task
- `updateTaskStatus()`: Updates a task's status
- `deleteTask()`: Deletes a task

## Setup Instructions

### Prerequisites
- Python 3.7+
- Node.js (for optional frontend development)

### Backend Setup
1. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```

2. Activate the virtual environment:
   - On Windows:
     ```bash
     .venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```bash
   uvicorn backend.main:app --reload
   ```

### Frontend Setup
1. The frontend is served directly from the `frontend` directory
2. Open `index.html` in a web browser
3. The frontend will automatically connect to the backend at `http://localhost:8000`

## Technologies Used
- **Backend**:
  - FastAPI (Python web framework)
  - SQLAlchemy (ORM)
  - Pydantic (Data validation)
  - SQLite (Database)

- **Frontend**:
  - HTML5
  - CSS3 (with custom variables for theming)
  - JavaScript (ES6)
  - Bootstrap 5 (UI components)
  - Font Awesome (Icons)
  - SweetAlert2 (Beautiful alerts)

## API Documentation
The FastAPI backend automatically generates interactive API documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Screenshots
(Include screenshots of the application here if available)

## Future Enhancements
1. User authentication and authorization
2. Task categories and tags
3. Task prioritization
4. Task search and filtering
5. User profile pages
6. Task attachments
7. Email notifications for due tasks

## License
This project is open-source and available under the MIT License.

