from typing import List
from pydantic import BaseModel
from .alternativa import AlternativaCreate, AlternativaRead, AlternativaPublica

class PerguntaCreate(BaseModel):
    texto : str
    alternativas : List[AlternativaCreate]

class PerguntasRead(BaseModel):
    id :int
    texto : str
    alternativas : List[AlternativaRead]

    class Config: 
        orm_mode = True


class PerguntasPublica(BaseModel):
    id :int
    texto : str
    alternativas : List[AlternativaPublica]

    class Config: 
        orm_mode = True

