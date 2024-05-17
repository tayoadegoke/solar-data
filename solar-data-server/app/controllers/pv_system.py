from sqlalchemy.orm import Session
from ..utils import get_current_user

from fastapi import Depends, APIRouter
from ..data.database import get_db
from ..data.pv_system import models as systemModels , dtos as systemDtos
from ..data.pv_system_module import models as moduleModels, dtos as moduleDtos
from ..data.user import dtos as userDtos

from sqlalchemy.orm import Session



router = APIRouter(tags=['PvSystem'],prefix='/pv_system')

@router.post("/",response_model=None)
def create_system(system: systemDtos.PvSystemCreate ,db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user)):
    if user:
        db_system = systemModels.PvSystem(**system.dict())
        db.add(db_system)
        db.commit()
        db.refresh(db_system)
        return [db_system] 

@router.put("/",response_model=None)
def create_system(system: systemDtos.PvSystemCreate ,db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user)):
    if user:
        db_system = systemModels.PvSystem(**system.dict())
        db.add(db_system)
        db.commit()
        db.refresh(db_system)
        return [db_system] 
  
@router.post("/modules",response_model=None)
def create_module(module: moduleDtos.PvSystemModuleCreate ,db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user)):
    if user:
        db_module = moduleModels.PvSystemModule(**module.dict())
        db.add(db_module)
        db.commit()
        db.refresh(db_module)
        return [db_module] 
    
@router.get("/modules",response_model=None)
def get_modules(db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user)):
    if user:
        db_module = db.query(moduleModels.PvSystemModule).all()
        return db_module

@router.get("/modules/{id}",response_model=None)
def get_modules(id:int, db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user)):
    if user:
        db_module = db.query(moduleModels.PvSystemModule).filter(moduleModels.PvSystemModule.id == id).first()
        return db_module