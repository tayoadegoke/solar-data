from fastapi import FastAPI , Depends
from fastapi.middleware.cors import CORSMiddleware
from .data.database import engine,Base,get_db
from sqlalchemy.orm import Session
from .controllers import auth, location, pv_system
from .config import Settings


app = FastAPI()
settings = Settings()

origins = [
    settings.CORS_ORIGIN_LOCAL,
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(location.router)
app.include_router(pv_system.router)

@app.get("/", response_model=None)
def read_root(db: Session = Depends(get_db)):
    return {"Hello": "World"}

