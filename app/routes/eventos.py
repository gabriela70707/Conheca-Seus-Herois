from fastapi import APIRouter, HTTPException, Depends, status
from sqlmodel import Session
from app.database import get_session
from app.models.evento import Evento
from app.schemas.evento import EventoBase, EventoCreate, EventoRead
from typing import List

router = APIRouter(prefix="/eventos")

@router.post("/", status_code = status.HTTP_201_CREATED)
def criar_evento (dados : EventoCreate, session : Session = Depends(get_session)):
    novo = Evento(**dados.dict()) #para que servve o **dados?
    session.add(novo)
    session.commit()
    session.refresh(novo)
    return novo

@router.get("/", response_model = List[EventoRead]) #para que serve o response model: "Quando devolver algo pro cliente, use esse schema pra formatar e validar a resposta."
def listar_evento(session : Session = Depends(get_session)):
    return session.query(Evento).all()#o query é : “Quero buscar todos os registros da tabela evento.” o .all() traz todos os resultados


'''
    exemplo de uso do schema de resposta para o usuario 
    Assim:
    Garante que o cliente receba só os campos públicos (por exemplo, não retorna senha ou dados internos)
    Gera documentação automática no Swagger /docs
    Valida a saída (seu endpoint não pode devolver algo fora do formato prometido)
'''
