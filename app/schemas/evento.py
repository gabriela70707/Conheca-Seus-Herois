from pydantic import BaseModel
from typing import Optional

class EventoBase(BaseModel):
    titulo : str
    local : Optional[str] = None
    data : Optional[str] = None
    descricao : Optional[str] = None

class EventoCreate(EventoBase):
    pass # Herda tudo de EventoBase

class EventoUpdate(EventoBase):
    pass

class EventoRead(EventoBase):
    id : int # Tudo do evento Base mais o id

    class Config:
        orm_mode = True #permite retornar objetos SQLModel diretamente sem erros
        '''
        EXEMPLO:
            @router.get("/{id}", response_model=EventoRead)
            def buscar_evento(id: int, session: Session = Depends(get_session)):
                evento = session.get(Evento, id)
                return evento  # ← esse é um objeto ORM retornado diretamente

        Se orm_mode não estiver ativado, ele quebra, porque espera um dicionário (ex: evento["nome"]), e não um objeto (ex: evento.nome)
        '''


'''
💡 O que o BaseModel faz?
Valida os dados recebidos na requisição

Transforma automaticamente JSON em objeto Python

Garante que os campos tenham o tipo certo (ex: str, int, etc.)

Lida com erros de forma elegante (ex: campo ausente, tipo errado)

❗❗
SQLModel	Representa a tabela do banco de dados (estrutura real da tabela)
BaseModel	Representa os dados de entrada e saída na API
❗❗
'''
