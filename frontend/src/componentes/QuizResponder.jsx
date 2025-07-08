import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fundo from "../assets/fundo.png";
import styled from 'styled-components';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import confetti from 'canvas-confetti';

const AppWrapper = styled.div`
  min-height: 100vh;
  background-image: url(${fundo});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  justify-items: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const QuizResponder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [emblemaConquistado, setEmblemaConquistado] = useState(null);
  const [emblemaJaTinha, setEmblemaJaTinha] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/quizzes/${id}/responder`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Quiz não encontrado');
        return res.json();
      })
      .then(data => setQuiz(data))
      .catch(() => navigate('/quizzes'));
  }, [id, token, navigate]);

  const responder = () => {
    fetch(`${import.meta.env.VITE_API_URL}/quizzes/${id}/responder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ respostas })
    })
      .then(res => res.json())
      .then(data => {
        setResultado(data);
        console.log("Resultado do quiz:", data);
        setModalAberto(true);

        if (data.emblema_ganho) {
          fetch(`${import.meta.env.VITE_API_URL}/emblemas/${data.emblema_ganho}`)
            .then(res => res.json())
            .then(emblema => setEmblemaConquistado(emblema));
        }

        if (data.ja_tinha_emblema) {
          setEmblemaJaTinha(true);
        }
      })
      .catch(err => alert('Erro ao enviar respostas'));
  };

  //  Dispara confetes quando um novo emblema é conquistado
  useEffect(() => {
    if (emblemaConquistado) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  }, [emblemaConquistado]);

  if (!quiz) return <p style={{ textAlign: 'center' }}>Carregando quiz...</p>;

  return (
    <AppWrapper>
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'grid', justifyContent:'center' }}>
        <h2>{quiz.titulo}</h2>
        <p>{quiz.descricao}</p>

        {quiz.perguntas.map((pergunta) => (
          <div key={pergunta.id} style={{ marginBottom: '1.5rem', backgroundColor: '#ECECEC', borderRadius:'2vh', color:'black', padding : '3vh' }}>
            <p><strong>{pergunta.texto}</strong></p>
            {pergunta.alternativas.map((alt) => (
              <label key={alt.id} style={{ display: 'block', marginBottom: '0.3rem' }}>
                <input
                  type="radio"
                  name={`pergunta-${pergunta.id}`}
                  value={alt.id}
                  checked={respostas[pergunta.id] === alt.id}
                  onChange={() =>
                    setRespostas({ ...respostas, [pergunta.id]: alt.id })
                  }
                />
                {alt.texto}
              </label>
            ))}
          </div>
        ))}

        <button onClick={responder} style={{
          marginTop: '1rem',
          padding: '0.6rem 1.2rem',
          borderRadius: '8px',
          backgroundColor: '#2160B9',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Enviar respostas
        </button>
      </div>

      {/* Modal de resultado */}
      <Dialog open={modalAberto} onClose={() => setModalAberto(false)}>
        <DialogTitle>Resultado do Quiz</DialogTitle>
        <DialogContent>
          {resultado && (
            <>
              <p>Acertos: {resultado.acertos} de {resultado.total}</p>
              <p>Nota: {resultado.nota}%</p>

              {emblemaJaTinha && (
                <p style={{ color: '#999' }}>
                  Você já havia conquistado esse emblema anteriormente. 👑
                </p>
              )}

              {!resultado.emblema_ganho && !emblemaJaTinha && (
                <p style={{ color: '#999' }}>
                  Continue tentando para conquistar o emblema!
                </p>
              )}

              {emblemaConquistado && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <h3 style={{ color: '#FFD700' }}>🏆 Parabéns!</h3>
                  <img
                    src={emblemaConquistado.imagem}
                    alt={emblemaConquistado.nome}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      border: '4px solid gold',
                      boxShadow: '0 0 20px gold'
                    }}
                  />
                  <h4>{emblemaConquistado.nome}</h4>
                  <p>{emblemaConquistado.descricao}</p>
                </div>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/')}>Voltar à Home</Button>
          <Button onClick={() => setModalAberto(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </AppWrapper>
  );
};

export default QuizResponder;
