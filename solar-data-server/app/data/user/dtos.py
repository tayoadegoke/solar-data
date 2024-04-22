from pydantic import BaseModel,ConfigDict


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str
    firstName: str
    lastName: str
    country: str
    phoneNumber: str


class User(UserBase):
    id: int
   
    class Config:
        from_attributes = True
        model_config = ConfigDict(arbitrary_types_allowed=True)
