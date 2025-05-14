from datetime import date, datetime
from typing import List, Optional, Dict, Annotated
from uuid import uuid4

from fastapi import FastAPI, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr, validator, StringConstraints
from sqlalchemy import create_engine, Column, String, Text, Date, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship

from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI
app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLite Database Configuration
SQLALCHEMY_DATABASE_URL = "sqlite:///./task_tracker.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class DBUser(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    tasks = relationship("DBTask", back_populates="owner")

class DBTask(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    due_date = Column(Date)
    status = Column(String)
    created_at = Column(DateTime)
    user_id = Column(String, ForeignKey("users.id"))
    owner = relationship("DBUser", back_populates="tasks")

# Create tables
Base.metadata.create_all(bind=engine)

# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Constants
ALLOWED_STATUSES = ["pending", "in_progress", "completed", "cancelled"]

# Pydantic Models
class UserBase(BaseModel):
    username: Annotated[str, StringConstraints(min_length=3, max_length=20)]
    email: EmailStr

class UserCreate(UserBase):
    pass

class UserRead(UserBase):
    id: str

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: date
    status: str = "pending"

class TaskCreate(TaskBase):
    user_id: str

class Task(TaskBase):
    id: str
    user_id: str
    created_at: datetime

    @validator('status')
    def validate_status(cls, v):
        if v not in ALLOWED_STATUSES:
            raise ValueError(f"Status must be one of: {', '.join(ALLOWED_STATUSES)}")
        return v

    @validator('due_date')
    def validate_due_date(cls, v):
        if v < date.today():
            raise ValueError("Due date cannot be in the past")
        return v

class TaskStatusUpdate(BaseModel):
    status: str

# API Endpoints
@app.get("/")
def read_root():
    return {"message": "Task Tracker API is running"}

# User Endpoints
@app.post("/users/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if username or email already exists
    existing_user = db.query(DBUser).filter(
        (DBUser.username == user.username) | (DBUser.email == user.email)
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username or email already exists"
        )
    
    user_id = str(uuid4())
    db_user = DBUser(id=user_id, username=user.username, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=Dict[str, UserRead])
def list_users(db: Session = Depends(get_db)):
    users = db.query(DBUser).all()
    return {user.id: user for user in users}

@app.get("/users/{user_id}", response_model=UserRead)
def read_user(user_id: str, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.delete("/users/{user_id}")
def delete_user(user_id: str, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # First delete all tasks associated with this user
    db.query(DBTask).filter(DBTask.user_id == user_id).delete()
    
    # Then delete the user
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}

# Task Endpoints
@app.post("/tasks/", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(DBUser).filter(DBUser.id == task.user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Validate task data
    try:
        task_model = Task(
            title=task.title,
            description=task.description,
            due_date=task.due_date,
            status=task.status,
            id=str(uuid4()),  # temporary for validation
            user_id=task.user_id,
            created_at=datetime.now()
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    # Create task
    db_task = DBTask(
        id=str(uuid4()),
        title=task.title,
        description=task.description,
        due_date=task.due_date,
        status=task.status,
        created_at=datetime.now(),
        user_id=task.user_id
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks/{task_id}", response_model=Task)
def read_task(task_id: str, db: Session = Depends(get_db)):
    db_task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.put("/tasks/{task_id}", response_model=Task)
def update_task_status(task_id: str, update: TaskStatusUpdate, db: Session = Depends(get_db)):
    db_task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if update.status not in ALLOWED_STATUSES:
        raise HTTPException(
            status_code=400,
            detail=f"Status must be one of: {', '.join(ALLOWED_STATUSES)}"
        )
    
    db_task.status = update.status
    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: str, db: Session = Depends(get_db)):
    db_task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}

@app.get("/users/{user_id}/tasks", response_model=List[Task])
def list_user_tasks(user_id: str, db: Session = Depends(get_db)):
    if not db.query(DBUser).filter(DBUser.id == user_id).first():
        raise HTTPException(status_code=404, detail="User not found")
    
    tasks = db.query(DBTask).filter(DBTask.user_id == user_id).all()
    return tasks