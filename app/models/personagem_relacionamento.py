# aqui criamos um autorelacionamento onde vamos relacionar um personagem com o outro 
#Aqui, personagem_id e relacionado_id apontam para a mesma tabela: personagem. É isso que cria o auto-relacionamento 

from sqlmodel import SQLModel, Field, ForeignKey, Relationship
from typing import Optional

class PersonagemRelacionamento (SQLModel, table = True):
    personagem_id : Optional[int] = Field(default = None, foreign_key= "personagem.id", primary_key = True)
    relacionamento_id : Optional[int] = Field(default = None, foreign_key= "personagem.id", primary_key = True)
    tipo: Optional[str] = None #ex : amigo, irmao , discipulo ...

    personagem: Optional["Personagem"] = Relationship(
        back_populates = "relacionamentos", 
        sa_relationship_kwargs={"foreign_keys": "[PersonagemRelacionamento.personagem_id]"}
    )
    relacionado: Optional["Personagem"] = Relationship(
        back_populates = "relacionado_por", 
        sa_relationship_kwargs={"foreign_keys": "[PersonagemRelacionamento.relacionamento_id]"}
    )

"""sa_relationship_kwargs={...} Esse é o “atalho” que o SQLModel fornece pra passar argumentos do SQLAlchemy puro.
Foi necessario pois o compilador nao estava entendendo qual foreign key usar por isso precisamos especificar dentro do Relationship
como ele nao enteende o parametro foreign_keys passado direto precisamos do suporte do  sa_relationship_kwargs={...}
"""
    