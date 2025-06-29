from sqlmodel import SQLModel, Field, Relationship
from typing import Optional

class PersonagemEmblema(SQLModel, table=True):
    personagem_id: Optional[int] = Field(default=None, foreign_key = "personagem.id", primary_key = True)
    emblema_id: Optional[int] = Field(default=None, foreign_key = "emblema.id", primary_key = True)

    personagem: "Personagem" = Relationship(back_populates="emblemas")
    emblema: "Emblema" = Relationship(back_populates="personagens")
