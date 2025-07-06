from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.security import get_current_user
from app.models.emblema import Emblema
from app.models.usuario import Usuario
from app.schemas.emblema import EmblemaCreate, EmblemaRead, EmblemaUpdate
from typing import List

router = APIRouter(prefix="/emblemas")

@router.get("/", response_model=List[EmblemaRead])
def listar_emblemas(session : Session = Depends(get_session)):
    return session.query(Emblema).all()


@router.get("/{id}", response_model=EmblemaRead)
def buscar_emblema(id: int, session : Session = Depends(get_session)):
    emblema = session.get(Emblema, id)
    if not emblema:
        raise HTTPException(status_code=404, detail="Emblema não encontrado")
    return emblema


@router.post("/", status_code = status.HTTP_201_CREATED)
def criar_emblema(dados:EmblemaCreate, session:Session = Depends(get_session)):
    #nao permitir que haja um emblema com o mesmo nome que outro 
    existe = session.query(Emblema).filter(Emblema.nome == dados.nome).first()
    #.first() → pega o primeiro resultado encontrado (ou None se não encontrar nada)
    if existe:
        raise HTTPException(status_code=400, detail = "Já existe emblema com esse nome")
    emblema = Emblema(**dados.dict())
    session.add(emblema)
    session.commit()
    session.refresh(emblema)
    return emblema

@router.put("/{id}")
def atualizar_emblema(id:int, dados : EmblemaUpdate, session : Session = Depends(get_session)):
    emblema = session.get(Emblema, id)
    if not emblema:
        raise HTTPException(status_code=404, detail="Emblema não encontrado")
    
    dados_dict = dados.dict(exclude_unset=True)
    for chave, valor in dados_dict.items():
        setattr(emblema, chave, valor)

    session.add(emblema)
    session.commit()
    session.refresh(emblema)
    return emblema

@router.delete("/{id}", status_code=status.HTTP_200_OK)
def deletar_emblema(id:int, session: Session = Depends(get_session)):
    emblema = session.get(Emblema, id)
    if not emblema:
        raise HTTPException(status_code=404, detail="Emblema não encontrado")
    
    session.delete(emblema)
    session.commit()
    return {"mensagem":"Emblema removido com sucesso"}


#listar os emblemas do usuario logado 
@router.get("/me", response_model=List[EmblemaRead])
def listar_emblemas_do_personagem(usuario : Usuario = Depends(get_current_user), session : Session = Depends(get_session)):
    personagem = usuario.personagem
    if not personagem:
        raise HTTPException(status_code=404, detail="Usuario não tem personagem")
    emblemas = [vinculo.emblema for vinculo in personagem.emblemas if vinculo.emblema is not None] #garante que so vai haver emblemas diferentes de noneS
    return emblemas