from pydantic import BaseModel
from typing import Optional, List
from app.schemas.emblema import EmblemaRead

class PersonagemCreate(BaseModel):
    nome:str #ex: Davi
    imagem:Optional[str] = None
    historia: Optional[str] = None #ele contando a historia dele
    periodo: Optional[str] = None # periodo em que ele viveu
    genealogia: Optional[str] = None 
    licoes: Optional[str] = None # ele falando sobre as lições que aprendeu
    livro_principal: Optional[str] = None #livro principal que sua historia é contada

class PersonagemUpdate(BaseModel):  #shema de update
    nome:str #ex: Davi
    imagem:Optional[str] = None
    historia: Optional[str] = None #ele contando a historia dele
    periodo: Optional[str] = None # periodo em que ele viveu
    genealogia: Optional[str] = None 
    licoes: Optional[str] = None # ele falando sobre as lições que aprendeu
    livro_principal: Optional[str] = None #livro principal que sua historia é contada

class PersonagemRead(PersonagemCreate):
    id : int
    
    class Config:
        orm_mode = True

# cartinha do usuario
class PersonagemCartinha(PersonagemRead):
    emblemas : List[EmblemaRead] = []

    class Config:
        orm_mode = True