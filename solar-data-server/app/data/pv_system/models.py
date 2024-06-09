from ..database import Base
from sqlalchemy import Column, ForeignKey, String, Integer,Float, Boolean
from sqlalchemy.orm import relationship , Mapped, mapped_column

class PvSystem(Base):
    __tablename__ = 'pv_system'
    id = Column(Integer,primary_key=True, nullable=False )
    step = Column(Integer, nullable=False, default=0 )
    inverter_count = Column(Integer, nullable=True)
    module_id = Column(Integer, ForeignKey("pv_system_module.id"), nullable=True)
    inverter_id = Column(Integer, ForeignKey("pv_system_inverter.id"), nullable=True)
    location_id: Mapped[int] = mapped_column(ForeignKey("location.id"))

    module = relationship('PvSystemModule', back_populates='system')
    inverter = relationship('PvSystemInverter', back_populates='system')

    def __repr__(self):
        return f"<PvSystem(id={self.id}, module_id='{self.module_id}')>"

    def __str__(self):
        return f"PvSystem(id={self.id}, module_id='{self.module_id}')"