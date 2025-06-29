from typing import Optional 
from sqlmodel import SQLModel, Field, Relationship

class Evento(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    titulo: str
    descricao: Optional[str] = None
    local: Optional[str] = None
    data_aproximada: Optional[str] = None

    personagens: list["PersonagemEvento"] = Relationship(back_populates="evento")
