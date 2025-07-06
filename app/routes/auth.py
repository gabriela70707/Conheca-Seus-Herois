from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.database import get_session
from app.models.usuario import Usuario
from app.schemas.token import Token, LoginData
from app.security import verificar_senha, criar_token_jwt

router = APIRouter()

@router.post("/login",  response_model=Token)
def login(dados : LoginData, session : Session = Depends(get_session)):
    usuario = session.query(Usuario).filter(Usuario.email == dados.email).first()
    if not usuario or not verificar_senha(dados.senha, usuario.senha_hash):
        raise HTTPException(status_code=400, detail="Credenciais inválidas")
    
    token = criar_token_jwt({"sub":str(usuario.id)})
    return {"access_token" : token, "token_type": "bearer"}