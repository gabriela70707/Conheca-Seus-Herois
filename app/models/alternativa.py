from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional

class Alternativa (SQLModel, table = True):
    id : Optional[int] = Field(default=None, primary_key=True)
    texto : str 
    correta : bool = False
    pergunta_id : int = Field(foreign_key="pergunta.id")

    pergunta: Optional["Pergunta"] = Relationship(back_populates="alternativas")