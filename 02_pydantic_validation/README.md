![Alt Text](/fastapi.png)

## 🧠 What is Pydantic?

Pydantic is a data validation and settings management library for Python that uses Python type annotations. It helps ensure that the data you receive is valid before using it.

* It parses and validates input data (like JSON, query parameters, etc.)
* It auto-converts compatible types (e.g., strings to integers)
* It raises detailed validation errors if something goes wrong

```bash
pip install pydantic
```

---

## 📦 Code Explanation

### 1. Basic Pydantic Model

```python
from pydantic import BaseModel, EmailStr

class Data(BaseModel):
    name: str
    email: EmailStr
    age: int
    gender: str

    def info(self):
        print(f"{self.name} ,{self.email} , {self.age} , {self.gender}")
```

* `BaseModel`: All models must inherit from this class.
* `EmailStr`: Ensures email format is valid.
* `info()` method: Prints data.

Usage:

```python
data_1 = Data(name="muzaffar", email="muzaffar@gmail.com", age="18", gender="male")
data_1.info()
```

Pydantic auto-converts age from str to int.

### 2. Error Handling with ValidationError

```python
from pydantic import BaseModel, ValidationError

class User(BaseModel):
    id: int
    name: str
    age: int
    gender: str

user_data = {"id":1, "name":"muzaffar", "age":18, "gender":"male"}
user = User(**user_data)
```

* Uses `**user_data` to unpack dict into model fields
* `model_dump()` gives dict format
* Handles invalid types using `try...except` block with `ValidationError`

### 3. Nested Pydantic Models

```python
class Address(BaseModel):
    street: str
    city: str
    zip_code: int

class UserWithAddress(BaseModel):
    name: str
    email: EmailStr
    age: int
    gender: str
    Addresses: list[Address]
```

* Validates nested dictionaries inside list as list of `Address`
* `model_validate()` is used to validate from raw `dict`
* If any field (like zip code) has wrong type, validation error is raised

### 4. Custom Validators

```python
from pydantic import validator

class User(BaseModel):
    name: str
    email: str
    age: int
    gender: str

    @validator("name")
    def name_checker(cls, name):
        if len(name) < 3:
            raise ValueError("Name must be at least 3 characters long")
        return name

    @validator("email")
    def email_checker(cls, email):
        if not email.endswith("@gmail.com"):
            raise ValueError("Only Gmail addresses are allowed")
        return email
```

* `@validator` runs custom validation logic on fields
* Helpful for format checks and business rules

---

## 🚀 FastAPI App Explanation

### Dependencies

```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from datetime import datetime, UTC
from uuid import uuid4
```

* `FastAPI`: Web framework for building APIs
* `HTTPException`: To raise HTTP errors (e.g., bad request)
* `Field`: Used to define default values
* `uuid4`: Generates unique session IDs

### FastAPI Initialization

```python
app = FastAPI(
    title="DACA Chatbot API",
    description="A FastAPI-based API for a chatbot in the DACA tutorial series",
    version="0.1.0",
)
```

* Metadata helps with `/docs` documentation page

### Metadata Model

```python
class Metadata(BaseModel):
    timestamp: datetime = Field(default_factory=lambda: datetime.now(tz=UTC))
    session_id: str = Field(default_factory=lambda: str(uuid4()))
```

* Automatically adds current UTC time and a unique session ID

### Message and Response Models

```python
class Message(BaseModel):
    user_id: str
    text: str
    metadata: Metadata
    tags: list[str] | None = None

class Response(BaseModel):
    user_id: str
    reply: str
    metadata: Metadata
```

* Request (`Message`) and response (`Response`) models
* Optional tags field using `| None`

### Root Endpoint

```python
@app.get("/")
async def root():
    return {"message": "Welcome to the DACA Chatbot API! Access /docs for the API documentation."}
```

* Basic GET route for testing API

### Get User Endpoint

```python
@app.get("/users/{user_id}")
async def get_user(user_id: str, role: str | None = None):
    user_info = {"user_id": user_id, "role": role if role else "guest"}
    return user_info
```

* Accepts a user\_id and optional query parameter `role`
* Returns user info

### POST Chat Endpoint

```python
@app.post("/chat/", response_model=Response)
async def chat(message: Message):
    if not message.text.strip():
        raise HTTPException(status_code=400, detail="Message text cannot be empty")

    reply_text = f"Hello, {message.user_id}! You said: '{message.text}'. How can I assist you today?"

    return Response(
        user_id=message.user_id,
        reply=reply_text,
        metadata=Metadata()
    )
```

* Checks if message is empty
* Responds with greeting and echo of user input
* Returns structured response with metadata

---

## 📘 How to Run

1. Install dependencies:

```bash
pip install fastapi uvicorn pydantic
```

2. Run the app:

```bash
uvicorn your_script_name:app --reload
```

3. Go to [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to test the API.

---

## ✅ Summary

* **Pydantic** provides powerful and type-safe data validation
* **FastAPI** allows building high-performance APIs quickly
* Nested models, custom validators, error handling, and API routes were implemented
* This project gives a solid foundation for any API-based chatbot or user validation system
