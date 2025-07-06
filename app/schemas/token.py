#SCHEMA DE LOGIN 
from pydantic import BaseModel

class Token(BaseModel):
    acess_token : str
    token_type : str = "bearer" #o que significa esse tipo? Bearer é um tipo de token de autenticação usado em APIs, significa "portador"

class LoginData(BaseModel):
    email : str
    senha : str