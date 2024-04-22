from sqlalchemy.orm import Session
from ..utils import hash_password,verify_password,create_access_token

from fastapi import Depends, HTTPException,APIRouter,status
from ..data.database import get_db
from ..data.user import models, dtos
from ..data.auth import dtos as authDtos

from sqlalchemy.orm import Session


router = APIRouter(tags=['Auth'])


@router.post("/register",response_model=list[dtos.User])
def create_user(user: dtos.UserCreate ,db: Session = Depends(get_db)):
    hashed_password = hash_password(user.password)
    user.password = hashed_password
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return [db_user]

@router.post("/login",response_model=authDtos.Token)
def login_user(user_credentials: authDtos.UserLogin ,db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong Credentials")
    
    if not verify_password(user_credentials.password, db_user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong Credentials")
   
    token =  create_access_token(data= {"user": db_user.email})
    return {
        "access_token" : token,
        "token_type":"Bearer"
        
    }
