from pydantic import BaseModel
from app.schemas.personagem import PersonagemRead

class RelacionamentoPersonagemLink(BaseModel):
    personagem_id : int
    relacionado_id : int
    tipo : str #ex: aliado, irmão mentor...

class RelacionamentoPersonagemDetalhado(BaseModel):
    personagem: PersonagemRead
    tipo: str
    