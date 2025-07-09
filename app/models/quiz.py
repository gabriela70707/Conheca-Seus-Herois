from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from .emblema import Emblema

class Quiz(SQLModel, table = True):
    id : Optional[int] = Field(default=None, primary_key=True)
    titulo : str 
    descricao : Optional[str] = None
    emblema_id : Optional[int] = Field(default=None, foreign_key="emblema.id") #cada quiz esta associado a um emblema especifico

    perguntas : List["Pergunta"] = Relationship(back_populates="quiz", sa_relationship_kwargs={"cascade": "all, delete"})
    emblema: Optional[Emblema] = Relationship() #para que possa acessar todos os atributos de Emblema

from app.models.pergunta import Pergunta #importação tardia(lazy import) para evitar importação circular