from fastapi import Request
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from ..config import Settings

settings = Settings()
connectString = "sqlite:///./solardata.db"
#connectString = f'postgresql+psycopg://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}'
engine = create_engine(connectString, connect_args={"check_same_thread":False})
sessionLocal = Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db(req:Request):
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()