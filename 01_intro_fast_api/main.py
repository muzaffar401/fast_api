
# Example 1: Basic API jo "Hello World" return karti hai
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello World"}



# Example 2: User ka naam lo aur usko welcome karo

# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/welcome/{name}")
# def welcome_user(name: str):
#     return {"message": f"Welcome, {name}!"}

# Example 3: Optional query parameter

# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/greet")
# def greet(name: str = "Guest"):
#     return {"message": f"Hello, {name}"}


# Example 4: Two parameters (path + query)

# from fastapi import FastAPI

# app = FastAPI()

@app.get("/items/{item_id}")
def read_item(item_id: int, details: bool = False):
    if details:
        return {"item_id": item_id, "description": "Yeh item bohot achha hai"}
    else:
        return {"item_id": item_id}





