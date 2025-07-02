from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.models.personagem_evento import PersonagemEvento
from app.schemas.personagem_evento import PersonagemEventoLink

router = APIRouter(prefix = "/personagens-eventos")

@router.post("/", status_code = status.HTTP_201_CREATED)
def vincular_personagem_evento(dados: PersonagemEventoLink, session : Session = Depends(get_session)):
    #Verificar se a associação já existe para evitar duplicações
    existe = session.get(PersonagemEvento, (dados.personagem_id, dados.evento_id))
    if existe:
        raise HTTPException(status_code=400, detail="Associação já existe.")

    associacao = PersonagemEvento(**dados.dict())
    session.add(associacao)
    session.commit()
    session.refresh(associacao)

    return {"mensagem":"Personagem vinculado ao evento com sucesso!!"}


"""
Adicionar filtros de eventos com personagens 
personagens com evento

Remover vinculos de personagem_evento
"""