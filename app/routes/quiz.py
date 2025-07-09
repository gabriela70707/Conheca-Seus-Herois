from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database import get_session
from app.models.quiz import Quiz
from app.models.pergunta import Pergunta
from app.models.alternativa import Alternativa
from app.models.personagem_emblema import PersonagemEmblema
from app.schemas.quiz import QuizCreate, QuizRead, QuizPublico, QuizUpdate
from app.schemas.resposta_quiz import RespostaQuiz
from typing import List
from app.security import get_current_user
from app.models.usuario import Usuario

router = APIRouter()

@router.post("/quizzes", response_model=QuizRead)
def criar_quiz(dados : QuizCreate ,session : Session = Depends(get_session)):
    quiz = Quiz(
        titulo=dados.titulo,
        descricao=dados.descricao,
        emblema_id=dados.emblema_id
    )
    session.add(quiz)
    session.commit()
    session.refresh(quiz)

    for pergunta_data in dados.perguntas:
        pergunta = Pergunta(texto=pergunta_data.texto, quiz_id=quiz.id)
        session.add(pergunta)
        session.commit()
        session.refresh(pergunta)
    
        for alternativa_data in pergunta_data.alternativas:
            alternativa = Alternativa(
                texto=alternativa_data.texto,
                correta=alternativa_data.correta,
                pergunta_id=pergunta.id
            )
            session.add(alternativa)

    session.commit()
    session.refresh(quiz)
    return quiz

# Rota que mostra a alternativa certa
@router.get("/quizzes", response_model=List[QuizRead])
def listar_quizzes(session : Session = Depends(get_session)):
    quizzes = session.exec(select(Quiz)).all() #exec(select(Quiz)).all() é o mesmo que o querry().all() porem o exec é mais moderno e mais poderoso pois permite mais filtros
    return quizzes

# Rota que nao mostra qual é a alternativa correta
@router.get("/quizzes/publicos", response_model=List[QuizPublico])
def listar_quizzes_publicos(session : Session = Depends(get_session)):
    quizzes = session.exec(select(Quiz)).all()
    return quizzes

@router.post("/quizzes/{quiz_id}/responder")
def responder_quiz(
    quiz_id:int,
    respostas : RespostaQuiz,
    usuario : Usuario = Depends(get_current_user),
    session : Session = Depends(get_session)
):
    quiz = session.get(Quiz, quiz_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz não encontrado")
    
    perguntas = session.exec(select(Pergunta).where(Pergunta.quiz_id == quiz_id)).all() # o .all() tranforma perguntas em uma lista de objetos Pergunta
    total = len(perguntas) #tamanho da lista perguntas
    acertos = 0

    for pergunta in perguntas:
        alternativa_id = respostas.respostas.get(pergunta.id)
        if not alternativa_id:
            continue #usuario nao respondeu essa pergunta

        alternativa = session.get(Alternativa, alternativa_id)
        if alternativa and alternativa.correta:
            acertos +=1
    
    nota = acertos / total if total > 0 else 0 #se total for maior que 0 calcula se nao é 0

    emblema_ganho = None
    ja_tinha_emblema = False

    # Se acertou 70% ou mais, ganha o emblema
    if nota >= 0.7 and quiz.emblema_id:
        personagem = usuario.personagem
        if not personagem:
            raise HTTPException(status_code=400, detail="Usuario não tem personagem")

        #verifica se o personagem já tem esse emblema
        ja_tem = session.exec(select(PersonagemEmblema).where(PersonagemEmblema.personagem_id == personagem.id, PersonagemEmblema.emblema_id == quiz.emblema_id)).first()
        
        if ja_tem:
            ja_tinha_emblema = True
        else:
            vinculo = PersonagemEmblema(
                personagem_id = personagem.id,
                emblema_id = quiz.emblema_id
            )
            session.add(vinculo)
            session.commit()
            emblema_ganho = quiz.emblema_id

    return {
        "mensagem" : "Quiz respondido com sucesso",
        "acertos" : acertos,
        "total" : total,
        "nota": round(nota * 100, 2),
        "emblema_ganho": emblema_ganho,
        "ja_tinha_emblema" : ja_tinha_emblema
    }

#mostra as perguntas e alternativas de um quiz em especifico
@router.get("/quizzes/{quiz_id}/responder", response_model=QuizPublico)
def obter_quiz_para_responder(quiz_id: int, session: Session = Depends(get_session)):
    quiz = session.get(Quiz, quiz_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz não encontrado")
    return quiz


@router.put("/quizzes/{quiz_id}", response_model=QuizRead)
def atualizar_quiz(quiz_id: int, dados: QuizUpdate, session: Session = Depends(get_session)):
    quiz = session.get(Quiz, quiz_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz não encontrado")

    if dados.titulo is not None:
        quiz.titulo = dados.titulo
    if dados.descricao is not None:
        quiz.descricao = dados.descricao
    if dados.emblema_id is not None:
        quiz.emblema_id = dados.emblema_id

    session.add(quiz)
    session.commit()
    session.refresh(quiz)

    #Atualizar perguntas e alternativas
    if dados.perguntas:
        # Remove perguntas antigas
        perguntas_antigas = session.exec(select(Pergunta).where(Pergunta.quiz_id == quiz.id)).all()
        for pergunta in perguntas_antigas:
            session.delete(pergunta)
        session.commit()

        # Adiciona novas perguntas e alternativas
        for pergunta_data in dados.perguntas:
            nova_pergunta = Pergunta(texto=pergunta_data.texto, quiz_id=quiz.id)
            session.add(nova_pergunta)
            session.commit()
            session.refresh(nova_pergunta)

            for alternativa_data in pergunta_data.alternativas:
                nova_alternativa = Alternativa(
                    texto=alternativa_data.texto,
                    correta=alternativa_data.correta,
                    pergunta_id=nova_pergunta.id
                )
                session.add(nova_alternativa)

        session.commit()
    return quiz


@router.delete("/quizzes/{quiz_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_quiz(quiz_id: int, session: Session = Depends(get_session)):
    quiz = session.get(Quiz, quiz_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz não encontrado")

    # Deleta perguntas e alternativas relacionadas
    perguntas = session.exec(select(Pergunta).where(Pergunta.quiz_id == quiz_id)).all()
    for pergunta in perguntas:
        alternativas = session.exec(select(Alternativa).where(Alternativa.pergunta_id == pergunta.id)).all()
        for alternativa in alternativas:
            session.delete(alternativa)
        session.delete(pergunta)

    # Deleta o quiz
    session.delete(quiz)
    session.commit()

"""
Exemplo de requisição para a criação do quiz:

{
  "titulo": "Quem foi Davi?",
  "descricao": "Teste seus conhecimentos sobre o rei Davi",
  "emblema_id": 1,
  "perguntas": [
    {
      "texto": "Qual era a profissão de Davi antes de ser rei?",
      "alternativas": [
        { "texto": "Pescador", "correta": false },
        { "texto": "Pastor de ovelhas", "correta": true },
        { "texto": "Ferreiro", "correta": false }
      ]
    },
    {
      "texto": "Quem Davi derrotou com uma funda?",
      "alternativas": [
        { "texto": "Golias", "correta": true },
        { "texto": "Saul", "correta": false },
        { "texto": "Elias", "correta": false }
      ]
    }
  ]
}

"""

