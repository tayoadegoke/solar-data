from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    AUTH_SECRET_KEY:str 
    AUTH_ALG:str
    AUTH_ACCESS_TOKEN_EXP: int

    CORS_ORIGIN_LOCAL:str

    DB_NAME : str
    DB_USER :str 
    DB_PASSWORD:str
    DB_HOST:str 
    DB_PORT:str 
    model_config = SettingsConfigDict(env_file=".env")