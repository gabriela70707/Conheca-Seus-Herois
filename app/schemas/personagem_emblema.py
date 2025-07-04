from pydantic import BaseModel

class PersonagemEmblemaLink(BaseModel):
    personagem_id : int
    emblema_id : int