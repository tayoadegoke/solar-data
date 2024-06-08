from ..database import Base
from sqlalchemy import Column, ForeignKey, String, Integer,Float, Boolean
from sqlalchemy.orm import relationship , Mapped, mapped_column

class PvSystem(Base):
    __tablename__ = 'pv_system'
    id = Column(Integer,primary_key=True, nullable=False )
    module_id = Column(Integer, ForeignKey("pv_system_module.id"), nullable=True)
    inverter_id = Column(Integer, ForeignKey("pv_system_inverter.id"), nullable=True)
    location_id: Mapped[int] = mapped_column(ForeignKey("location.id"))

    module = relationship('PvSystemModule', back_populates='system')
    inverter = relationship('PvSystemInverter', back_populates='system')

