from typing import Optional, List
from pydantic import BaseModel
from .pergunta import PerguntaCreate, PerguntasRead, PerguntasPublica
from .emblema import EmblemaRead

class QuizCreate(BaseModel):
    titulo : str
    descricao : Optional[str] = None
    emblema_id : Optional[int] = None
    perguntas : List[PerguntaCreate]

class QuizRead(BaseModel):
    id :int
    titulo : str
    descricao : Optional[str] = None
    emblema_id : Optional[int] = None
    emblema: Optional[EmblemaRead] = None #permite que o front tenha acesso a todos os atriutos de emblema
    perguntas : List[PerguntasRead]

    class Config:
        orm_mode = True

class QuizPublico(BaseModel):
    id :int
    titulo : str
    descricao : Optional[str] = None
    emblema_id : Optional[int] = None
    emblema: Optional[EmblemaRead] = None 
    perguntas : List[PerguntasPublica]

    class Config:
        orm_mode = True