from ..database import Base
from sqlalchemy import Column, ForeignKey, String, Integer,Float, Boolean
from sqlalchemy.orm import relationship

class PvSystemInverter(Base):
    __tablename__ = 'pv_system_inverter'
    id = Column(Integer,primary_key=True, nullable=False )
    name = Column(String, nullable=False)
    inv_snl_c0 =   Column(Float , nullable=False)
    inv_snl_c1 = Column(Float , nullable=False)
    inv_snl_c2 = Column(Float , nullable=False)
    inv_snl_eff_euro =  Column(Float , nullable=False)
    inv_snl_idcmax =  Column(Float , nullable=False)
    inv_snl_c3 =  Column(Float , nullable=False)
    inv_snl_eff_cec =  Column(Float , nullable=False)
    inv_snl_paco =  Column(Integer, nullable=False)
    inv_snl_pdco =  Column(Float , nullable=False)
    inv_snl_pnt =   Column(Float , nullable=False)
    inv_snl_pso =  Column(Float , nullable=False)
    inv_snl_vac = Column(Integer, nullable=False)
    inv_snl_vdcmax =  Column(Integer, nullable=False)
    inv_snl_vdco = Column(Integer, nullable=False)
    mppt_hi_inverter = Column(Integer, nullable=False)
    mppt_low_inverter = Column(Integer, nullable=False)
    system = relationship("PvSystem", back_populates='inverter')
    
