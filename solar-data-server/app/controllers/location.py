from sqlalchemy.orm import Session
from ..utils import get_current_user

from fastapi import Depends, APIRouter
from ..data.database import get_db
from ..data.location import models, dtos
from ..data.user import dtos as userDtos

from sqlalchemy.orm import Session



router = APIRouter(tags=['Location'],prefix='/location')


@router.post("",response_model=list[dtos.Location])
def create_location(location: dtos.LocationCreate ,db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user)):
    if user:
        newLocationObj = {"user_id":user.id, **location.dict()}
        db_location = models.Location(**newLocationObj)
        db.add(db_location)
        db.commit()
        db.refresh(db_location)
        return [db_location]
    
@router.get("",response_model=list[dtos.LocationGet])
def get_locations(db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user)):
    if user:
        db_location = db.query(models.Location).filter(models.Location.user_id == user.id).all()
        return db_location
    




