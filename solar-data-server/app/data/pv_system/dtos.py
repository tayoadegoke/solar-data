from typing import List
from pydantic import BaseModel, ConfigDict


class PvSystemBase(BaseModel):
    location_id : int


class PvSystemCreate(PvSystemBase):
   pass

class PvSystemGet(PvSystemBase):
    id:int

    class Config:
        from_attributes = True
        model_config = ConfigDict(arbitrary_types_allowed=True)


class PvSystemModule(PvSystemBase):
    id: int
    module_id : int
    inverter_id : int

    class Config:
        from_attributes = True
        model_config = ConfigDict(arbitrary_types_allowed=True)
