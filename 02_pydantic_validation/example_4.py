from pydantic import BaseModel, EmailStr, validator, ValidationError

class Address(BaseModel):
    street: str
    city: str
    zip: int

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

# Now validate it properly
try:
    user = User(name="m", email="muzaffar@gmail.com", age="18", gender="male")
except ValidationError as e:
    print("❌ Validation Error:")
    print(e)