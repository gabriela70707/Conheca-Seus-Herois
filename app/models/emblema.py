from typing import Optional
from sqlmodel import SQLModel, Field, Relationship

class Emblema(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome:str
    descricao: Optional[str] = None
    icone_url: Optional[str] = None

    personagens: list ["PersonagemEmblema"] = Relationship(back_populates="emblema")