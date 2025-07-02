from pydantic import BaseModel

class PersonagemEventoLink(BaseModel):
    personagem_id : int
    evento_id : int