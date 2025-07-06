from fastapi import APIRouter,Depends, HTTPException
from sqlmodel import Session
from app.database import  get_session
from app.models.usuario import Usuario
from app.security import get_current_user
from app.schemas.personagem import PersonagemUpdate
from app.data.imagens_personagens import IMAGENS_PERSONAGENS

router = APIRouter(prefix="/me")

@router.get("/personagem")
def obter_meu_personagem(usuario : Usuario = Depends(get_current_user), session : Session = Depends(get_session)):
    personagem = usuario.personagem
    if not personagem:
        raise HTTPException(status_code=404, detail="Personagem não encontrado")
    return personagem

@router.put("/personagem")
def atualizar_meu_personagem(dados : PersonagemUpdate, usuario : Usuario = Depends(get_current_user), session : Session = Depends(get_session)):
    personagem = usuario.personagem
    if not personagem:
        raise HTTPException(status_code=404, detail="Personagem não encontrado")
    
    # Validação da imagem
    if dados.imagem:
        imagens_validas = [img["url"] for img in IMAGENS_PERSONAGENS]
        if dados.imagem not in imagens_validas:
            raise HTTPException(status_code=400, detail="Imagem não permitida")

    for campo, valor in dados.dict(exclude_unset=True).items():
        setattr(personagem, campo, valor)
    
    session.add(personagem)
    session.commit()
    session.refresh(personagem)

    return {"mensagem":"Sua carta foi atualizado com sucesso", "personagem": personagem}