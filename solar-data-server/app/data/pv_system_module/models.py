from ..database import Base
from sqlalchemy import Column, ForeignKey, String, Integer,Float, Boolean
from sqlalchemy.orm import relationship

class PvSystemModule(Base):
    __tablename__ = 'pv_system_module'
    id = Column(Integer,primary_key=True, nullable=False )
    name = Column(String, nullable=False)
    technology = Column(Integer, nullable=False)
    cec_area = Column(Float , nullable=False)
    cec_gamma_r = Column(Float )
    cec_is_bifacial = Column(Boolean, default=False)
    cec_p_mp_ref = Column(Float)
    cec_a_ref = Column(Float )
    cec_adjust = Column(Float)
    cec_alpha_sc = Column(Float )
    cec_beta_oc = Column(Float )
    cec_bifacial_ground_clearance_height = Column(Float)
    cec_bifacial_transmission_factor = Column(Float)
    cec_bifaciality = Column(Float )
    cec_gamma_r = Column(Float )
    cec_gap_spacing = Column(Float , nullable=True)
    cec_i_l_ref = Column(Float)
    cec_i_mp_ref = Column(Float )
    cec_i_o_ref = Column(Float )
    cec_i_sc_ref = Column(Float )
    cec_module_height = Column(Float )
    cec_module_width = Column(Float )
    cec_mounting_config =  Column(Integer)
    cec_n_s =  Column(Integer, nullable=False)
    cec_p_mp_ref = Column(Float , nullable=False)
    cec_r_s = Column(Float , nullable=False)
    cec_r_sh_ref = Column(Float , nullable=False)
    cec_t_noct = Column(Float , nullable=False)
    cec_v_mp_ref = Column(Float , nullable=False)
    cec_v_oc_ref = Column(Float , nullable=False)
    system = relationship("PvSystem" , back_populates='module')
    
    def __repr__(self):
        return f"<PvSystemModule(id={self.id}, module_name='{self.name}')>"

    def __str__(self):
        return f"PvSystemModule(id={self.id}, module_name='{self.name}')"