from pydantic import BaseModel
from typing import Optional

class PersonagemCreate(BaseModel):
    nome:str #ex: Davi
    imagem:Optional[str] = None
    historia: Optional[str] = None #ele contando a historia dele
    periodo: Optional[str] = None # periodo em que ele viveu
    genealogia: Optional[str] = None 
    licoes: Optional[str] = None # ele falando sobre as lições que aprendeu
    conflitos: Optional[str] = None #conflitos que enfrentou em palavras chaves ex: medo, tristeza etc...
    livro_principal: Optional[str] = None #livro principal que sua historia é contada