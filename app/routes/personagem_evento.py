from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session
from typing import List
from app.database import get_session
from app.models.personagem_evento import PersonagemEvento
from app.models.personagem import Personagem
from app.schemas.personagem_evento import PersonagemEventoLink
from app.schemas.evento import EventoRead

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

@router.delete("/", status_code=status.HTTP_200_OK)
def desvincular_personagem_evento(dados : PersonagemEventoLink, session : Session = Depends(get_session)):
    associacao = session.get(PersonagemEvento, (dados.personagem_id, dados.evento_id))
    if not associacao:
        raise HTTPException(status_code=404, detail="Essa associacao não existe!")
    session.delete(associacao)
    session.commit()
    return {"mensagem" : "Vinculo entre personagem e evento deletado com sucesso"}

#todos os eventos que um personagem participou 
@router.get("/personagem/{personagem_id}/eventos", response_model=List[EventoRead])
def listar_eventos_por_personagem(personagem_id : int, session : Session = Depends(get_session)):
    personagem = session.get(Personagem, personagem_id)
    if not personagem:
        raise HTTPException(status_code=404, detail="Personagem não encontrado!")
    eventos = [associacao.evento for associacao in personagem.eventos]
    return eventos