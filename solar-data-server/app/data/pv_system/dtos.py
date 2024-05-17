from typing import List
from pydantic import BaseModel, ConfigDict


class PvSystemBase(BaseModel):
    name : str
    module_id : int


class PvSystemCreate(PvSystemBase):
   pass

class PvSystemGet(PvSystemBase):
    id:int

    class Config:
        from_attributes = True
        model_config = ConfigDict(arbitrary_types_allowed=True)


class PvSystemModule(PvSystemBase):
    id: int
   
    class Config:
        from_attributes = True
        model_config = ConfigDict(arbitrary_types_allowed=True)
