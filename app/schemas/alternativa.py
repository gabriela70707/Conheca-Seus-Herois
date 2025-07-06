from pydantic import BaseModel

class AlternativaCreate(BaseModel):
    texto : str 
    correta : bool = False

class AlternativaRead(BaseModel):
    id : int
    texto : str
    correta : bool 

    class Config:
        orm_mode = True

# para retornar as alternativas para o usuario sem mostrar qual é a correta 
class AlternativaPublica(BaseModel):
    id : int
    texto : str

    class Config: 
        orm_mode = True