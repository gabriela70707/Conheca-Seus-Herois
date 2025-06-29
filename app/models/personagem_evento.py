from sqlmodel import SQLModel, Field, Relationship
from typing import Optional

class PersonagemEvento (SQLModel, table = True):
    personagem_id : Optional[int] = Field(foreign_key = "personagem.id", primary_key = True)
    evento_id : Optional[int] = Field(foreign_key = "evento.id", primary_key = True)


    #permite a navegação entre as tabelas com facilidade 
    personagem: "Personagem" = Relationship(back_populates = "eventos")  #será preenchido automaticamente com o objeto completo da tabela Personagem
    evento: "Evento" = Relationship(back_populates = "personagens") #será preenchido automaticamente com o objeto completo da tabela Evento
