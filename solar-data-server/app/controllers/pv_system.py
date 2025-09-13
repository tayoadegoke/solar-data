from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload
from ..utils import get_current_user

from fastapi import Depends, APIRouter, HTTPException
from ..data.database import get_db
from ..data.pv_system import models as systemModels , dtos as systemDtos
from ..data.pv_system_module import models as moduleModels, dtos as moduleDtos
from ..data.pv_system_inverter import models as inverterModels, dtos as inverterDtos
from ..data.user import dtos as userDtos, models as userModel
from ..data.location import dtos as locationDtos, models as locationModel




router = APIRouter(tags=['PvSystem'],prefix='/pv_system')




@router.get("",response_model=None)
def get_systems(db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user), location_id:str = ''):
    if location_id == '':
        return ['location id is required']
    if user:
         location = db.query(locationModel.Location).filter(locationModel.Location.user_id == user.id, locationModel.Location.id == int(location_id) ).first()
         if location:
            db_system = db.query(systemModels.PvSystem).outerjoin(moduleModels.PvSystemModule).outerjoin(inverterModels.PvSystemInverter).filter(systemModels.PvSystem.location_id == location.id).options(joinedload(systemModels.PvSystem.module), joinedload(systemModels.PvSystem.inverter)).all()
            result = []
            for system in db_system:
                if system:
                    print(system.module)
                    system_data = {
                        
                    "id": system.id,
                    "inverter_count": system.inverter_count,
                    "inverter_id": system.inverter.id if system.inverter else None,
                    "inverter_name": system.inverter.name if system.inverter else None,
                  
                    "location_id":  system.location_id,
                    "module_id": system.module.id if system.module else None,
                    "module_name": system.module.name if system.module else None,
                    "step": system.step
                    
                }
                      
                    result.append(system_data)
            return result
         
@router.post("",response_model=None)
def create_system(system: systemDtos.PvSystemCreate ,db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user)):
    if user:
        location = db.query(locationModel.Location).filter(locationModel.Location.id == system.location_id).first()
        if location.user_id == user.id:
            db_system = systemModels.PvSystem(**system.dict())
            db.add(db_system)
            db.commit()
            db.refresh(db_system)
            return [db_system] 
        else:
            return ['Not right user']


@router.put("/{system_id}",response_model=None)
def update_system( system_id: int,system: systemDtos.PvSystemUpdate ,db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user)):
    if user:
        db_system = db.query(systemModels.PvSystem).filter(systemModels.PvSystem.id == system_id).first()
        if not db_system:
            raise HTTPException(status_code=404, detail="System not found")

        # Update the system's attributes
        for key, value in system.dict().items():
            print(key, value)
            setattr(db_system, key, value)

     
        print(db_system)
        
        db.commit()
        db.refresh(db_system)
        return db_system
  
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
    

@router.post("/inverters",response_model=None)
def create_inverter(inverter: inverterDtos.PvSystemInverterCreate ,db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user)):
    if user:
        db_inverter = inverterModels.PvSystemInverter(**inverter.dict())
        db.add(db_inverter)
        db.commit()
        db.refresh(db_inverter)
        return [db_inverter] 
    
@router.get("/inverters",response_model=None)
def get_inverters(db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user)):
    if user:
        db_inverter = db.query(inverterModels.PvSystemInverter).all()
        return db_inverter

@router.get("/inverter/{id}",response_model=None)
def get_inverter(id:int, db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user)):
    if user:
        db_inverter = db.query(inverterModels.PvSystemInverter).filter(inverterModels.PvSystemInverter.id == id).first()
        return db_inverter
    
@router.get("/{system_id}",response_model=None)
def get_system(system_id: int, db: Session = Depends(get_db), user:userDtos.User = Depends(get_current_user), location_id:str = ''):
    if location_id == '':
        return ['location id is required']
    if user:
         location = db.query(locationModel.Location).filter(locationModel.Location.user_id == user.id, locationModel.Location.id == int(location_id) ).first()
         if location:
            db_system = db.query(systemModels.PvSystem).outerjoin(moduleModels.PvSystemModule).outerjoin(inverterModels.PvSystemInverter).filter(systemModels.PvSystem.id == system_id).options(joinedload(systemModels.PvSystem.module), joinedload(systemModels.PvSystem.inverter)).first()
            result = []
            system =  db_system
            if system:
                    print(system.module)
                    system_data = {
                        
                    "id": system.id,
                    "inverter_count": system.inverter_count,
                    "inverter_id": system.inverter.id if system.inverter else None,
                    "inverter_name": system.inverter.name if system.inverter else None,
                  
                    "location_id":  system.location_id,
                    "module_id": system.module.id if system.module else None,
                    "module_name": system.module.name if system.module else None,
                    "step": system.step
                    
                }
                      
                    result.append(system_data)
            return result