from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class Conflito(SQLModel, table=True):
    id: Optional[int] = Field(default = None, primary_key = True)
    nome : str
    descrição : Optional[str] = None

    personagens: List["PersonagemConflito"] = Relationship(back_populates = "conflitos")