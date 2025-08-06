from fastapi import APIRouter, status

from ..packages import regex

router = APIRouter(prefix="/process", tags=["process"])

@router.get(
    "/",
    name="api for process",
    description="",
    include_in_schema=False,
    status_code=status.HTTP_200_OK,
)
async def process():
    return "Ok"

test = regex.Regex()

@router.get(
    "/images",
    name="api for process",
    description="",
    include_in_schema=False,
    status_code=status.HTTP_200_OK,
)
async def process():
    res = test.test()
    return res