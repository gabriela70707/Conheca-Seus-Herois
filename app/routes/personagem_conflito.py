from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session
from typing import List
from app.models.personagem_conflito import PersonagemConflito
from app.models.conflito import Conflito
from app.models.personagem import Personagem
from app.schemas.personagem_conflito import PersonagemConflitoLink
from app.schemas.personagem import PersonagemRead
from app.schemas.conflito import ConflitoRead
from app.database import get_session

router = APIRouter(prefix="/personagens-conflitos")

@router.post("/", status_code=status.HTTP_201_CREATED)
def vincular_personagem_conflito(dados : PersonagemConflitoLink, session : Session = Depends(get_session)):
    existe = session.get(PersonagemConflito, (dados.personagem_id, dados.conflito_id))
    if existe:
        raise HTTPException(status_code = 400, detail="Essa associação já existe")
    associacao = PersonagemConflito(**dados.dict())
    session.add(associacao)
    session.commit()
    return {"mensagem":"Personagem vinculado a conflito com sucesso!"}

@router.delete("/", status_code=status.HTTP_200_OK)
def desvincular_personagem_conflito(dados : PersonagemConflitoLink, session : Session = Depends(get_session)):
    associacao = session.get(PersonagemConflito, (dados.personagem_id, dados.conflito_id))
    if not associacao:
        raise HTTPException(status_code=404, detail="Essa associação não existe!")
    session.delete(associacao)
    session.commit()
    return {"mensagem":"Vinculo entre personagem e conflito deletado com sucesso"} #lemvrar de sempre deixar mensagens bem claras e diretas
'''
exemplo de requisição:
DELETE /personagens-conflitos
{
  "personagem_id": 1,
  "conflito_id": 2
}
'''


#listar todos os personagens envolvidos em um conflito
"""
Essa rota vai:
- Receber o ID de um conflito
- Buscar os personagens associados via relacionamento
- Retornar uma lista com os dados desses personagens
"""
@router.get("/conflito/{conflito_id}/personagens", response_model=List[PersonagemRead])
def listar_personagem_por_conflito(conflito_id : int, session : Session = Depends(get_session)):
    conflito = session.get(Conflito, conflito_id)
    if not conflito:
        raise HTTPException(status_code=404, detail="Conflito não encontrado")
    personagens = [associacao.personagem for associacao in conflito.personagens]
    return personagens




#listar todos os conflitos em que um personagem esteve envolvido
'''
Essa rota vai:
- Receber o ID de um personagem
- Buscar os conflitos associados via relacionamento
- Retornar uma lista com os dados desses conflitos
'''
@router.get("/personagem/{personagem_id}/conflitos", response_model=List[ConflitoRead])
def listar_conflitos_por_personagens(personagem_id : int, session : Session = Depends(get_session)):
    personagem = session.get(Personagem, personagem_id)
    if not personagem:
        raise HTTPException(status_code=404, detail="Personagem não encontrado!")
    #list comprehension
    conflitos = [associacao.conflito for associacao in personagem.conflitos]
    return conflitos

'''
explicação da logica:
- personagem.conflitos é uma lista de objetos PersonagemConflito
- associacao é o nome que você deu para cada item dessa lista
- associacao.conflito acessa o conflito real dentro da associação
'''