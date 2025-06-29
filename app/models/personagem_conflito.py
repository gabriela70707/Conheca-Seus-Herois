from typing import Optional
from sqlmodel import SQLModel, Field, Relationship 

class PersonagemConflito(SQLModel, table = True):
    personagem_id: Optional[int] = Field(default = None, foreign_key = "personagem.id", primary_key = True)
    conflito_id: Optional[int] = Field(default = None, foreign_key = "conflito.id", primary_key = True)

    personagem: "Personagem" = Relationship(back_populates = "conflitos")
    conflito: "Conflito" = Relationship(back_populates = "personagens")