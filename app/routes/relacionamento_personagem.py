from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.models.personagem_relacionamento import PersonagemRelacionamento
from app.schemas.relacionamento_personagem import RelacionamentoPersonagemLink, RelacionamentoPersonagemDetalhado
from typing import List
from app.models.personagem import Personagem

router = APIRouter(prefix="/relacionamentos")

@router.post("/", status_code=status.HTTP_201_CREATED)
def criar_relacionamento(dados : RelacionamentoPersonagemLink, session : Session = Depends(get_session)):
    existe = session.get(PersonagemRelacionamento, (dados.personagem_id, dados.relacionamento_id))
    if existe:
        raise HTTPException(status_code=400, detail="Esse Relacionamento já existe")
    relacionamento = PersonagemRelacionamento(**dados.dict())
    session.add(relacionamento)
    session.commit()
    return {"mensagem" : "Relacionamento criado com sucesso!"}

#Todos os relacionamentos que um personagem tem 
@router.get("/personagem/{personagem_id}/relacionamentos", response_model=List[RelacionamentoPersonagemDetalhado])
def relacionamento_por_personagem(personagem_id : int, session : Session = Depends(get_session)):
    personagem = session.get(Personagem, personagem_id)
    if not personagem:
        raise HTTPException(status_code=404, detail="Personagem não encontrado")
    relacionamentos = [{"personagem":rel.relacionado, "tipo":rel.tipo} for rel in personagem.relacionamentos]
    return relacionamentos

@router.delete("/", status_code=status.HTTP_200_OK)
def desvincular_personagem_relacionamento(dados : RelacionamentoPersonagemLink, session : Session = Depends(get_session)):
    associacao = session.get(RelacionamentoPersonagemLink, (dados.personagem_id, dados.relacionado_id))
    if not associacao:
        raise HTTPException(status_code=404, detail="Vinculo não encontrado!")
    session.delete(associacao)
    session.commit()
    return {"mensagem":"Vinculo entre personagens excluido com sucesso!"}