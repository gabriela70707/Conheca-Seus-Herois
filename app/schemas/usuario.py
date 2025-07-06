from pydantic import BaseModel, EmailStr

class UsuarioCreate(BaseModel):
    nome : str
    email : EmailStr
    senha : str 

class UsuarioRead(BaseModel):
    id:int
    nome:str
    email:EmailStr

    class Config:
        orm_mode = True