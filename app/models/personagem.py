from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship 
from app.models.personagem_emblema import PersonagemEmblema
from app.models.personagem_evento import PersonagemEvento
from app.models.personagem_relacionamento import PersonagemRelacionamento
from app.models.personagem_conflito import PersonagemConflito

class Personagem(SQLModel, table = True): #o nome da tabela é o nome da classe em letras minusculas
    id: Optional[int] = Field(default=None, primary_key=True)
    nome:str
    imagem:Optional[str] = None
    historia: Optional[str] = None
    periodo: Optional[str] = None
    genealogia: Optional[str] = None
    licoes: Optional[str] = None
    livro_principal: Optional[str] = None

    # Cada personagem pode ter vários emblemas; esse campo retorna todos os vínculos dele
    emblemas: List[PersonagemEmblema] = Relationship(back_populates = "personagem")
    
    # Aqui acessamos todos os registros de vínculo entre este personagem e eventos históricos
    eventos: List[PersonagemEvento] = Relationship(back_populates = "personagem")

    #Aqui acessamos todos os  registros de vinculo entre personagem e conflitos 
    conflitos: List[PersonagemConflito] = Relationship(back_populates = "personagem")

     # Relacionamentos que ESTE personagem iniciou com outros personagens
     # Ex: Daniel se relaciona com Abednego → essa lista terá o vínculo
    relacionamentos: List["PersonagemRelacionamento"] = Relationship(
        back_populates = "personagem", 
        sa_relationship_kwargs={
        "foreign_keys": "[PersonagemRelacionamento.personagem_id]"
        }                        
    )

    # Relacionamentos onde ESTE personagem é o alvo (ou seja, outro personagem se relacionou com ele)
    # Ex: Abednego está na lista de Daniel, então aqui aparece o vínculo do lado do Abednego
    relacionado_por: List["PersonagemRelacionamento"] = Relationship(
        back_populates = "relacionado", 
        sa_relationship_kwargs={
        "foreign_keys": "[PersonagemRelacionamento.relacionamento_id]"
        }
    )
        
    """
    cada personagem tem:
    relacionamentos → os que ele se relaciona
    relacionado_por → os que se relacionam com ele
    """