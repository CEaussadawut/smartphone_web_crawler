from .routers import process

from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware

import os
from os.path import join, dirname, abspath
from dotenv import load_dotenv

dotenv_path =  join(dirname(dirname(abspath(__file__))), '.env.development')
load_dotenv(dotenv_path)
app = FastAPI()

print(dotenv_path)

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(process.router)