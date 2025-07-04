from fastapi import APIRouter, Depends, status, HTTPException
from app.schemas.personagem_emblema import PersonagemEmblemaLink
from app.models.personagem_emblema import PersonagemEmblema
from app.schemas.emblema import EmblemaRead
from app.models.personagem import Personagem
from app.database import get_session
from sqlmodel import Session
from typing import List

router = APIRouter(prefix="/personagens-emblemas")

@router.post("/", status_code=status.HTTP_201_CREATED)
def vincular_personagem_emblema(dados : PersonagemEmblemaLink, session : Session = Depends(get_session)):
    existe = session.get(PersonagemEmblema, (dados.personagem_id, dados.emblema_id))
    if existe:
        raise HTTPException(status_code=400, detail="Esse vinculo já existe")
    associacao = PersonagemEmblema(**dados.dict())
    session.add(associacao)
    session.commit()
    return {"mensagem":"Emblema atribuido ao personagem com sucesso!"}

#listar todos os emblemas que um personagem tem 
@router.get("/personagem/{personagem_id}/emblemas", response_model=List[EmblemaRead])
def emblemas_por_personagens(personagem_id : int, session : Session = Depends(get_session)):
    personagem = session.get(Personagem, personagem_id)
    if not personagem:
        raise HTTPException(status_code=404, detail="Personagem não encontrado")
    emblemas = [associacao.emblema for associacao in personagem.emblemas]
    return emblemas

@router.delete("/", status_code=status.HTTP_200_OK)
def desvincular_emblema_personagem(dados : PersonagemEmblemaLink, session : Session = Depends(get_session)):
    vinculo = session.get(PersonagemEmblema, (dados.personagem_id, dados.emblema_id))
    if not vinculo:
        raise HTTPException(status_code=404, detail="Vinculo não encontrado")
    session.delete(vinculo)
    session.commit()
    return {"mensagem":"Vinculo entre emblema e personagem deletado com sucesso!"}