from typing import Optional
from sqlmodel import SQLModel, Relationship, Field
from app.models.personagem import Personagem

class Usuario(SQLModel, table = True):
    id : Optional[int] = Field(default=None, primary_key=True)
    nome : str
    email : str
    senha_hash : str

    personagem : Optional["Personagem"] = Relationship(back_populates="usuario")

    # nao podemos armazenar a senha como um texto puro por isso por isso usamos a função para gerar um hash seguro de senha com o bcrypt
