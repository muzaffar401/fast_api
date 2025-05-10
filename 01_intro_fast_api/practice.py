# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/")
# def home():
#     return {"task":"hello world"}

# @app.get("/about")
# def about():
#     data = {
#         "name":"muzaffar",
#         "class":"12th grade",
#         "age":21,
#         "number":3353958045
#     }
#     return data

# @app.get("/blog/{user_name}")
# def blog(user_name):
#     data = {
#         "post":"blog",
#         "user":user_name
#     }
#     return data

# def func(f_name:str,l_name):
#     return f"{f_name} {l_name}"
# first_name = "muzaffar"
# last_name = "ahmed"

# print(func(first_name.upper(),last_name))


# @app.get("/")
# def home():
#     return {"program":"hello world"}

# @app.get("/items/{item_id}")
# def item(item_id:int,q:str | None = None):
#     return {"item_id":item_id ,"query": q}
