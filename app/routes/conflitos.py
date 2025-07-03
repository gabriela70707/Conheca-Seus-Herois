from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.models.conflito import Conflito
from app.schemas.conflito import ConflitoCreate, ConflitoRead, ConflitoUpdate
from typing import List

router = APIRouter(prefix ="/conflitos")

@router.get("/", response_model=List[ConflitoRead])
def listar_conflito(session : Session = Depends(get_session)):
    return session.query(Conflito).all()

@router.get("/{id}", response_model=ConflitoRead)
def buscar_conflito(id : int, session : Session = Depends(get_session)):
    conflito = session.get(Conflito, id)
    if not conflito:
        raise HTTPException(status_code=404, detail="Conflito não encontrado")
    return conflito

@router.post("/", status_code= status.HTTP_201_CREATED)
def criar_conflito(dados : ConflitoCreate, session : Session = Depends(get_session)):
    existe = session.query(Conflito).filter(Conflito.nome == dados.nome).first()
    if existe:
        raise HTTPException(status_code=400, detail="Já existe um conflito com esse nome")
    conflito = Conflito(**dados.dict())
    session.add(conflito)
    session.commit()
    session.refresh(conflito)
    return conflito

@router.put("/{id}")
def atualizar_conflito(id:int, dados:ConflitoUpdate, session: Session = Depends(get_session)):
    conflito = session.get(Conflito, id)
    if not conflito:
        raise HTTPException(status_code=404, detail="Esse conflito não existe")
    
    dados_dict = dados.dict(exclude_unset=True)

    for chave, valor in dados_dict.items():
        setattr(conflito, chave, valor)
    
    session.commit()
    session.refresh(conflito)
    return conflito

@router.delete("/{id}", status_code=status.HTTP_200_OK)
def deletar_conflito(id : int, session : Session = Depends(get_session)):
    conflito = session.get(Conflito, id)
    if not conflito:
        raise HTTPException(status_code=404, detail="Esse conflito não existe")
    session.delete(conflito)
    session.commit()
    return {"mensagem":"Conflito excluido com sucesso"}