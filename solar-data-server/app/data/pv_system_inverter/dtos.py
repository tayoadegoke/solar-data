from typing import List
from pydantic import BaseModel, ConfigDict


class PvSystemInverterBase(BaseModel):
    pass

class PvSystemInverterCreate(PvSystemInverterBase):
    inv_snl_c0: float
    inv_snl_c1: float
    inv_snl_c2: float
    inv_snl_c3: float
    inv_snl_eff_cec: float
    inv_snl_eff_euro: float
    inv_snl_idcmax: float
    inv_snl_paco: int
    inv_snl_pdco: float
    inv_snl_pnt: float
    inv_snl_pso: float
    inv_snl_vac: int
    inv_snl_vdcmax: int
    inv_snl_vdco: int
    mppt_hi_inverter: int
    mppt_low_inverter: int
    name: str
    


class PvSystemInverterGet(PvSystemInverterCreate):
    id:int

    class Config:
        from_attributes = True
        model_config = ConfigDict(arbitrary_types_allowed=True)


class PvSystemInverter(PvSystemInverterCreate):
    id: int
   
    class Config:
        from_attributes = True
        model_config = ConfigDict(arbitrary_types_allowed=True)
