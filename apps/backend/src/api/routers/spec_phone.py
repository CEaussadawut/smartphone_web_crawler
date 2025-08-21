# import re
# from src.model import Spec_phone
# from src.utils import Regex, Pattern
# from fastapi import APIRouter, HTTPException, status

# router = APIRouter(prefix="/api")

# sample_regex = Regex()
# # SpecPhone = spec_phone.SpecPhone()

# @router.get("/{model_name}", status_code=status.HTTP_200_OK,response_model=SpecPhone)
# async def get_spec_phone(model_name: str):
#     try : 
#         matches = sample_regex.find(Pattern.FINDING_TABLE_HEAD, "acer_super_zx_5g-13796", True)
#         return matches

        
#     except Exception as error_msg:
#         raise HTTPException(
#                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                 detail=error_msg,
#             )