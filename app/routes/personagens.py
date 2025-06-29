from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from app.database import get_session
from app.models.personagem import Personagem
from app.schemas.personagem import PersonagemCreate
from typing import List

router = APIRouter(prefix="/personagens")

@router.post("/", status_code = status.HTTP_201_CREATED)
def criar_personagem(dados: PersonagemCreate, session: Session = Depends(get_session)):
    novo = Personagem(**dados.dict())
    session.add(novo)
    session.commit()
    session.refresh(novo)
    return novo

@router.get("/", response_model = List[Personagem])
def listar_personagem(session : Session = Depends(get_session)):
    return session.query(Personagem).all()