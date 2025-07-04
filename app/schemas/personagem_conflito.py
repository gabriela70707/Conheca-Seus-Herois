from pydantic import BaseModel

class PersonagemConflitoLink(BaseModel):
    personagem_id: int
    conflito_id: int
