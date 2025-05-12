from pydantic import BaseModel,EmailStr

class Address(BaseModel):
    street:str
    city:str
    zip_code:int

class UserWithAddress(BaseModel):
    name:str
    email:EmailStr
    age:int
    gender:str
    Addresses:list[Address]

user_data = {
    "name":"muzaffar",
    "email":"muzaffar",
    "age":"20",
    "gender":"male",
    "Addresses": [
        {"street":"F-25","city":"karachi","zip_code":"75660"},
        {"street":"F-27","city":"islamabad","zip_code":"87780"}
    ] 
}
# dict → model
user = UserWithAddress.model_validate(user_data) #model_validate() ne data check karke ek valid model object banaya.
# model to dict
print(user.model_dump())