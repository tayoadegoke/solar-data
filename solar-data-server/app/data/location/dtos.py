from typing import List
from pydantic import BaseModel, ConfigDict


class LocationBase(BaseModel):
    pass

class Coordinates(BaseModel):
    lat:float
    lng: float

class LocationCreate(LocationBase):
    name: str
    area: float
    ghi: int
    coordinates: List[Coordinates]

class LocationGet(LocationBase):
    id:int
    name: str
    area: float
    ghi: int
    coordinates: List[Coordinates]
    is_active:bool

    class Config:
        from_attributes = True
        model_config = ConfigDict(arbitrary_types_allowed=True)


class Location(LocationBase):
    id: int
    is_active: bool
   
    class Config:
        from_attributes = True
        model_config = ConfigDict(arbitrary_types_allowed=True)
