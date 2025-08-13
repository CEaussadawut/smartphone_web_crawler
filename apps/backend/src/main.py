from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api import (phone_router)
from src.config.config import PROJECT_NAME, VERSION

app = FastAPI(title=PROJECT_NAME, version=VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(phone_router,  prefix="/phone", tags=["phone"])

@app.get("/")
def read_root():
    return {"Hello": "World"}
