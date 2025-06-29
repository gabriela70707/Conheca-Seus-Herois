# aqui criamos um autorelacionamento onde vamos relacionar um personagem com o outro 
from sqlmodel import SQLModel, Field, ForeignKey, Relationship
from typing import Optional

class PersonagemRelacionamento (SQLModel, table = True):
    personagem_id : Optional[int] = Field(default = None, foreign_key= "personagem.id", primary_key = True)
    relacionamento_id : Optional[int] = Field(default = None, foreign_key= "personagem.id", primary_key = True)
    tipo: Optional[str] = None #ex : amigo, irmao , discipulo ...

    personagem: Optional["Personagem"] = Relationship(back_populates = "relacionamentos")
    relacionado: Optional["Personagem"] = Relationship(back_populates = "relacionado_por")

    #Aqui, personagem_id e relacionado_id apontam para a mesma tabela: personagem. É isso que cria o auto-relacionamento 
    