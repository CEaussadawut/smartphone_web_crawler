from typing import Union
from fastapi import FastAPI # type: ignore
from .routers import process

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(process.router)