from ..database import Base
from sqlalchemy import Column, ForeignKey, String, Integer,Float, Boolean
from sqlalchemy.orm import relationship

class PvSystem(Base):
    __tablename__ = 'pv_system'
    id = Column(Integer,primary_key=True, nullable=False )
    name = Column(String, nullable=False) 
    module_id = Column(Integer, ForeignKey("pv_system_module.id"), nullable=False)

