
## 📘Introduction to FastAPI with Examples

### 🚀 What is FastAPI?

**FastAPI** ek modern, fast (high-performance) web framework hai Python ke liye. Yeh APIs banane ke liye use hota hai, jiska focus **speed**, **simplicity**, aur **automatic documentation** pe hota hai.

### 🧠 Why Use FastAPI?

* **Fast development**: Code likhne mein fast aur easy.
* **Automatic docs**: Swagger UI jese powerful interface milta hai.
* **Type hinting**: Python type hints use karke validation auto ho jata hai.
* **Async support**: Asynchronous code easily likh sakte ho.

---

## 🔧 Installation

FastAPI ko install karne ke liye:

```bash
pip install fastapi
pip install "uvicorn[standard]"
```

> `uvicorn` ek ASGI server hai jisse FastAPI run hoti hai.

---

## 🚀 Running FastAPI Server

```bash
uvicorn main:app --reload
```

* `main`: Python file ka naam (`main.py`)
* `app`: FastAPI app object
* `--reload`: Development mode, auto-reload on file change

---

## 🌐 Swagger UI

Jab app run karo, browser mein jao:

📍 `http://127.0.0.1:8000/docs`

Yeh FastAPI ka **Swagger UI** hai — ek interactive tool jahan se tum API ko test kar sakte ho **bina Postman ke**.

---

## ✅ API Creation Examples

### 🔹 Example 1: Basic "Hello World" API

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello World"}
```

📌 **GET** request on `/` endpoint. Simple Hello World return karta hai.

---

### 🔹 Example 2: Welcome User by Name

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/welcome/{name}")
def welcome_user(name: str):
    return {"message": f"Welcome, {name}!"}
```

📌 **Path parameter** se user ka naam lo aur welcome message do.
E.g., `/welcome/Ali` → `"Welcome, Ali!"`

---

### 🔹 Example 3: Optional Query Parameter

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/greet")
def greet(name: str = "Guest"):
    return {"message": f"Hello, {name}"}
```

📌 **Query parameter** optional hai.
E.g., `/greet?name=Sara` → `"Hello, Sara"`
Agar naam na do: `/greet` → `"Hello, Guest"`

---

### 🔹 Example 4: Path + Query Together

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
def read_item(item_id: int, details: bool = False):
    if details:
        return {"item_id": item_id, "description": "Yeh item bohot achha hai"}
    else:
        return {"item_id": item_id}
```

📌 Is example mein `item_id` path se milta hai aur `details` query param hai.

E.g.,

* `/items/101` → `{"item_id": 101}`
* `/items/101?details=true` → `{"item_id": 101, "description": "Yeh item bohot achha hai"}`

---

## 🗺️ API Diagram

Yeh diagram FastAPI app ke routes aur structure ko show karta hai:

```
           +--------------------------+
           |      FastAPI App        |
           +--------------------------+
                    |
        +-----------+-----------+
        |           |           |
        v           v           v
     [GET /]   [GET /greet]   [GET /welcome/{name}]
        |           |           |
 {"Hello World"}  {"Hello, name"} {"Welcome, name"}

                    |
                    v
           [GET /items/{item_id}?details=true/false]
                    |
    {"item_id": id, "description": "..."} (if details = true)
    {"item_id": id} (if details = false)
```

---

## 📦 Final Notes

✅ Yeh chaar examples tumhe sikhate hain:

* Kaise ek basic API banti hai
* Kaise path aur query parameters use karte hain
* Kaise default values set karte hain
* Kaise Swagger UI se API test karte hain

---

