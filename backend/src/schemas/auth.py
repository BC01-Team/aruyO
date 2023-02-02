from typing import Optional
from pydantic import BaseModel,Field

class RequestBody(BaseModel):
  email: str = Field(example="info@mercari.com")
  password: str = Field(example="password")
