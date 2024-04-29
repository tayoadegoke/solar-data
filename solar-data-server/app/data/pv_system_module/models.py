from ..database import Base
from sqlalchemy import Column, ForeignKey, String, Integer,Float, Boolean

class PvSystemModule(Base):
    __tablename__ = 'pv_system_module'
    id = Column(Integer,primary_key=True, nullable=False )
    name = Column(String, nullable=False)
    technology = Column(Integer, nullable=False)
    cec_area = Column(Float , nullable=False)
    cec_gamma_r = Column(Float , nullable=False)
    cec_is_bifacial = Column(Boolean, nullable=False, default=False)
    cec_p_mp_ref = Column(Float , nullable=False)
   