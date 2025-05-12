from pydantic import BaseModel,ValidationError

class User(BaseModel):
    id:int
    name:str
    age:int
    gender:str

user_data={"id":1,"name":"muzaffar","age":18,"gender":"male"}
user = User(**user_data)
print(user)
print(user.model_dump()) # dict format me generate kardeta he model_dump()

try:
    invalid_user = User(id="1g",name="muzaffar",age="18",gender="male")
except ValidationError as e:
    print(e)