from ..database import Base
from sqlalchemy import Column,Integer,String,Boolean
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer,primary_key=True , nullable=False)
    email = Column(String , nullable=False, unique=True)
    password = Column(String , nullable=False,) 
    firstName = Column(String, nullable=False,)
    lastName = Column(String , nullable=False,)
    country = Column(String, nullable=False,)
    phoneNumber = Column(String , nullable=False)
    is_activated = Column(Boolean, default=False)
    locations = relationship("Location")
