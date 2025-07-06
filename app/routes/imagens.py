from fastapi import APIRouter
from app.data.imagens_personagens import IMAGENS_PERSONAGENS

router = APIRouter()

@router.get("/imagens-personagens")
def listar_imagens_personagens():
    return IMAGENS_PERSONAGENS