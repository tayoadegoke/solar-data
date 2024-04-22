from pydantic import BaseModel


class UserBase(BaseModel):
    email: str


class UserLogin(UserBase):
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user: str 