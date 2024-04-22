from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext 
from jose import JWTError , jwt
from datetime import datetime , timedelta , timezone
from .data.auth.dtos import TokenData
from .data.user.models import User
from .data.database import Session, get_db
from .config import Settings

password_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
settings = Settings()

SECRET_KEY = settings.AUTH_SECRET_KEY
ALGORITHM = settings.AUTH_ALG
ACCESS_TOKEN_EXPIRE_MINUTES = settings.AUTH_ACCESS_TOKEN_EXP

def hash_password(password:str):
    return password_context.hash(password)

def verify_password(password:str, hashed:str):
    return password_context.verify(password, hashed)

def create_access_token(data:dict):
    dataCopy = data.copy()
    expiry = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    dataCopy.update({"exp":expiry})
    return jwt.encode(dataCopy, SECRET_KEY, algorithm=ALGORITHM)

async def get_user(db, username: str):
   user = db.query(User).filter(User.email == username).first()
   if user:
        return user

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("user")
        if username is None:
            raise credentials_exception
        token_data = TokenData(user=username)
    except JWTError:
        raise credentials_exception
   
    user = await get_user(db, username=token_data.user)
    if user is None:
        raise credentials_exception
    return user