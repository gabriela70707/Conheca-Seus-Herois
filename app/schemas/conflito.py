from pydantic import BaseModel
from typing import Optional

class ConflitoCreate(BaseModel):
    nome : str
    descrição : Optional[str] = None

class ConflitoRead(ConflitoCreate):
    id: int

    class Config:
        orm_mode = True #permite retornar objetos SQLModel diretamente sem erros

class ConflitoUpdate(ConflitoCreate):
    pass