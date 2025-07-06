from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.models.usuario import Usuario
from app.database import get_session
from sqlmodel import Session

#Criptografia da senha 
pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

def hash_senha(senha : str) -> str:
    return pwd_context.hash(senha)

# função para verificar se a senha do usuario esta correta
def verificar_senha(senha_pura : str, senha_hash : str) -> bool:
    return pwd_context.verify(senha_pura, senha_hash)

# LOGICA PARA TOKENS
SECRET_KEY = "minha_chave_super_secreta"
ALGORITHM = "HS256"
TEMPO_EXPIRACAO_EM_MINUTOS = 60

def criar_token_jwt(dados : dict) -> str:
    dados_para_token = dados.copy()
    expiracao = datetime.utcnow() + timedelta(minutes=TEMPO_EXPIRACAO_EM_MINUTOS)
    dados_para_token.update({"exp":expiracao})
    token = jwt.encode(dados_para_token, SECRET_KEY, algorithm=ALGORITHM)
    return token

def decodificar_token_jwt(token : str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    
    except JWTError:
        return None
    
#FUNÇÂO PARA OBTER USUARIO LOGADO
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_current_user(token : str = Depends(oauth2_scheme), session : Session = Depends(get_session)) -> Usuario:
    payload = decodificar_token_jwt(token)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=401, detail="Token invalido ou expirado")
    
    usuario_id = int(payload["sub"])
    usuario = session.get(Usuario, usuario_id)

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario não encontrado")
    
    return usuario




#entender melhor cada parte do codigo 
# registrar as rotas no main
# criar a logica para o usuario editar as cartinhas






# o hash é uma versão embaralhada e irreversivel da senha 

'''
🔐 O que é bcrypt?
bcrypt é um algoritmo de hash seguro e amplamente usado. Ele:

Gera um hash único mesmo para senhas iguais

É lento de propósito (pra dificultar ataques)

Usa um “sal” embutido (um valor aleatório que impede que dois hashes iguais sejam gerados para senhas iguais)

Anotações sobre o codigo para entender:
S
CryptContext é um gerenciador de algoritmos de hash

Aqui, estamos dizendo: “use o algoritmo bcrypt”

deprecated="auto" significa que ele vai atualizar o hash se um dia o algoritmo mudar
'''