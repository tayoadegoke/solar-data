from typing import List
from pydantic import BaseModel, ConfigDict


class PvSystemModuleBase(BaseModel):
    name : str
    technology : int
    cec_area  : float
    cec_gamma_r : float
    cec_is_bifacial : bool
    cec_p_mp_ref : float


class PvSystemModuleCreate(PvSystemModuleBase):
   pass

class PvSystemModuleGet(PvSystemModuleBase):
    id:int

    class Config:
        from_attributes = True
        model_config = ConfigDict(arbitrary_types_allowed=True)


class PvSystemModule(PvSystemModuleBase):
    id: int
   
    class Config:
        from_attributes = True
        model_config = ConfigDict(arbitrary_types_allowed=True)
