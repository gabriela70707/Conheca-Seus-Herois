from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
#nao preciso importar o Quiz aqui pois ja estabeleço relacionamento com ele atraves da chave primaria

class Pergunta (SQLModel, table = True):
    id : Optional[int] = Field(default=None, primary_key=True)
    texto : str
    quiz_id : int = Field(foreign_key="quiz.id")

    quiz : Optional["Quiz"] = Relationship(back_populates="perguntas") 
    alternativas : List["Alternativa"] = Relationship(back_populates="pergunta", sa_relationship_kwargs={"cascade": "all, delete"})

from app.models.alternativa import Alternativa #importação tardia