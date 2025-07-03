#arquivo que inicializa e roda o fastapi
from fastapi import FastAPI

#Importando as tabelas 
from app.models import (
    personagem,
    emblema,
    personagem_emblema, 
    evento,
    personagem_evento, 
    personagem_relacionamento,
    conflito,
    personagem_conflito
)


from app.database import criar_banco
from app.routes import personagens, eventos, personagem_evento, emblemas, conflitos


app = FastAPI() #instancia do fastapi

#Essa função é executada automaticamente quando o servidor inicia.
@app.on_event("startup") #garante que o banco e as tabelas vão ser criados quando o app iniciar
def on_startup():
    criar_banco() # se as tabelas já existirem ele ignora se nao ele cria :) 

@app.get("/")
def root():
    return {"mensagem":"Conheça seus Herois está no ar!! 🚀"}

#incluindo as rotas dos routes 
app.include_router(personagens.router)
app.include_router(eventos.router)
app.include_router(personagem_evento.router)
app.include_router(emblemas.router)
app.include_router(conflitos.router)