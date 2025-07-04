from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.models.personagem import Personagem
from app.schemas.personagem import PersonagemCreate, PersonagemUpdate, PersonagemRead
from typing import List

router = APIRouter(prefix="/personagens")

@router.post("/", status_code = status.HTTP_201_CREATED)
def criar_personagem(dados: PersonagemCreate, session: Session = Depends(get_session)):
    novo = Personagem(**dados.dict())
    session.add(novo)
    session.commit()
    session.refresh(novo)
    return novo

@router.get("/", response_model = List[PersonagemRead])
def listar_personagem(session : Session = Depends(get_session)):
    return session.query(Personagem).all()


@router.get("/{id}", response_model = PersonagemRead)
def buscar_personagem(id: int, session : Session = Depends(get_session)):
    personagem = session.get(Personagem, id)
    if not personagem:
        raise HTTPException(status_code = 404, detail = "Personagem não encontrado")
    return personagem


@router.put("/{id}")
def atualizar_personagem(id: int, dados: PersonagemUpdate, session : Session = Depends(get_session)):
    personagem = session.get(Personagem, id)
    if not personagem:
        raise HTTPException(status_code=404, detail="Personagem não encontrado")
    
    dados_dict = dados.dict(exclude_unset=True)  #exclude_unset=True, ele ignora os campos que não foram enviados
    for chave, valor in dados_dict.items(): #.items() Pega esse dicionário e transforma em pares (chave, valor) — por exemplo: ("nome", "Moisés")
        setattr(personagem, chave, valor)

    session.add(personagem) #ainda nao salva o objeto porem indica que ele esta pronto para ser salvo no banco, então ele entra na fila 
    session.commit() #Agora sim o SQLModel fala: “OK, vamos executar tudo que estava na fila”, Isso envia o INSERT pro banco e grava o novo registro
    '''
    A partir daqui o banco gera coisas automaticamente, como:
        id (autoincremento)
        timestamps (se você tiver)
        valores por triggers, defaults, etc.
    Mas o Python ainda não sabe disso automaticamente.
    '''
    session.refresh(personagem) #Isso vai no banco e faz: “Traz pra mim os dados reais e atualiza esse objeto aqui” 
    #Isso atualiza o objeto novo com: id e outros valores gerados automaticamente

    return personagem

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_personagem(id: int, session : Session = Depends(get_session)):
    personagem = session.get(Personagem, id)
    if not personagem:
        raise HTTPException(status_code=404, detail="Personagem não encontrado")
    
    session.delete(personagem)
    session.commit()
    return

'''

setattr(obj, "campo", v)	Seta dinamicamente um valor num atributo:
    setattr(objeto, nome_do_campo, novo_valor)
    é equivalente a fazer :
    objeto.nome_do_campo = novo_valor


session.get(Modelo, id)	Busca um registro pela chave primária (geralmente id)
session.delete(objeto)	Remove um objeto do banco (precisa de commit() depois)


Se exclude_unset=True, ele ignora os campos que não foram enviados:
    Isso é muito útil em atualizações parciais: você só quer alterar o que o usuário mandou, não apagar o resto.
    dados.dict(exclude_unset=True)
    → {"nome": "Moisés", "periodo": "Egito"}
    Se o usuário não mandou imagem, genealogia, etc., esses campos ficam fora do dicionário — e você não corre risco de sobrescrever com None.
'''

'''
Como funciona o refresh:
novo = Personagem(nome="Débora")
session.add(novo)
print(novo.id)  # ❌ ainda é None

session.commit()
print(novo.id)  # ❌ ainda é None (em Python)

session.refresh(novo)
print(novo.id)  # ✅ agora mostra o ID real do banco
        
'''