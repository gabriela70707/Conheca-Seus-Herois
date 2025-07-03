from pydantic import BaseModel
from typing import Optional

class EmblemaCreate(BaseModel):
    nome:str
    descricao: Optional[str] = None
    icone_url: Optional[str] = None

class EmblemaRead(BaseModel):
    id: int
    nome:str
    descricao: Optional[str] = None
    icone_url: Optional[str] = None

    class Config:
        orm_mode = True #permite retornar objetos SQLModel diretamente sem erros

class EmblemaUpdate(EmblemaCreate):
    pass