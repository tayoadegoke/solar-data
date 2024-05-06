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
    cec_a_ref : float
    cec_adjust : float
    cec_alpha_sc : float
    cec_beta_oc : float
    cec_bifacial_ground_clearance_height : float
    cec_bifacial_transmission_factor : float
    cec_bifaciality: float
    cec_gamma_r : float
    cec_gap_spacing : float
    cec_i_l_ref : float
    cec_i_mp_ref : float
    cec_i_o_ref : float
    cec_i_sc_ref : float
    cec_module_height: float
    cec_module_width : float
    cec_mounting_config : float
    cec_n_s : float
    cec_p_mp_ref : float
    cec_r_s : float
    cec_r_sh_ref : float
    cec_t_noct : float
    cec_v_mp_ref : float
    cec_v_oc_ref : float
    


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
