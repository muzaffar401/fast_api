from pydantic import BaseModel,EmailStr

class Data(BaseModel):
  
    name:str
    email:EmailStr 
    age:int 
    gender:str 

    def info(self):
        print(f"{self.name} ,{self.email} , {self.age} , {self.gender}")

data_1 = Data(name="muzaffar",email="muzaffar@gmail.com",age="18",gender="male")
data_1.info()