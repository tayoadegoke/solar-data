from ..database import Base
from typing import List
from sqlalchemy import Column, ForeignKey, String, Integer,Float,JSON, Boolean
from sqlalchemy.orm import relationship, Mapped
from ..pv_system.models import PvSystem

class Location(Base):
    __tablename__ = 'location'
    id = Column(Integer,primary_key=True, nullable=False )
    name = Column(String, nullable=False)
    area = Column(Float, nullable=False)
    ghi = Column(Integer)
    coordinates = Column(JSON, nullable=False)
    is_active = Column(Boolean, nullable=False, default=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    systems : Mapped[List["PvSystem"]] = relationship("PvSystem")
