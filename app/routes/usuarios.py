from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.database import get_session
from app.models.usuario import Usuario
from app.models.personagem import Personagem
from app.schemas.usuario import UsuarioCreate, UsuarioRead
from app.security import hash_senha

router = APIRouter(prefix="/usuarios")

#criar um novo usuario
@router.post("/", response_model=UsuarioRead, status_code=status.HTTP_201_CREATED)
def registrar_usuario(dados : UsuarioCreate, session : Session = Depends(get_session)):
    #verificando se o email já esta em uso:
    existe = session.query(Usuario).filter(Usuario.email == dados.email).first()
    if existe:
        raise HTTPException(status_code=400, detail = "Esse email já está registrado!")
    
    #criando um usuario com senha criptografada
    usuario = Usuario(  #instancia da classe usuario
        nome = dados.nome, 
        email = dados.email, 
        senha_hash= hash_senha(dados.senha)
    )

    session.add(usuario)
    session.commit()
    session.refresh(usuario)

    personagem = Personagem(
        nome = usuario.nome,
        historia= "Minha história com Deus",
        usuario_id = usuario.id
    )

    session.add(personagem)
    session.commit()

    return usuario