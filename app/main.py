#arquivo que inicializa e roda o fastapi
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os 
from fastapi.middleware.cors import CORSMiddleware

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
from app.routes import (
    personagens,
    eventos,
    emblemas,
    conflitos,
    relacionamento_personagem,
    personagem_evento,
    personagem_emblema,
    personagem_conflito,
    imagens,
    usuarios,
    personagem_usuario,
    auth, 
    quiz
)


app = FastAPI() #instancia do fastapi

# Usei isso para garantir que a pasta static seja criada caso nao seja encontradas
# if not os.path.exists("static"):
#     os.makedirs("static")

app.mount("/static", StaticFiles(directory="static"), name = "static") #permite que o navegador acesse as imagens da pasta static via url


#configuração de cors para permitir o consumo do front end
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"], #aqui pode ser especifico tambem
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




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
app.include_router(personagem_conflito.router)
app.include_router(personagem_emblema.router)
app.include_router(relacionamento_personagem.router)
app.include_router(imagens.router)
app.include_router(usuarios.router)
app.include_router(personagem_usuario.router)
app.include_router(auth.router)
app.include_router(quiz.router)