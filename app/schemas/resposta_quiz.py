from pydantic import BaseModel
from typing import Dict

class RespostaQuiz(BaseModel):
    respostas : Dict[int, int] #{pergunta_id : alternativa_id}