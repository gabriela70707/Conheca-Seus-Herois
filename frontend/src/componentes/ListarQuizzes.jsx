import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fundo from '../assets/fundo.png'
import styled from 'styled-components';

const AppWrapper = styled.div`
  min-height: 100vh;
  background-image: url(${fundo});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  justify-items: start;
  align-items: start;

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

  .emblemas-existentes{
    display: grid;
    justify-items: start;
    padding: 1.2vw;

    .botoes{
      display: flex;
      gap: 1vw;
    }
  }

`;

const ListaQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [emblemasUsuario, setEmblemasUsuario] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/quizzes/publicos`)
      .then(res => res.json())
      .then(data => setQuizzes(data));

    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/emblemas/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setEmblemasUsuario(data.map(e => e.id)));
    }
  }, []);

  

  return (
    <AppWrapper>
      <div style={{ padding: '2rem' }}>
        <div className="info">
          <h2>Quizzes disponíveis</h2>
          <p>Você deve ter percebido que os herois tem seus emblemas certo? Você também pode conquistar os seus!</p>
          <p>Realize os quizzes teste seus conhecimentos e ganhe seus emblemas!</p>
        </div>
       
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {quizzes.map((quiz) => {
            const conquistado = emblemasUsuario.includes(quiz.emblema?.id);
            return (
              <div
                key={quiz.id}
                onClick={() => navigate(`/quiz/${quiz.id}/`)}
                style={{
                  background: 'white',
                  color: 'black',
                  padding: '1rem',
                  borderRadius: '12px',
                  width: '200px',
                  cursor: 'pointer',
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                }}

              >

                <img
                  src={quiz.emblema?.icone_url}
                  alt={quiz.emblema?.nome}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    filter: conquistado ? 'none' : 'grayscale(100%)',
                    marginBottom: '0.5rem',
                  }}
                />

                <p style={{ fontWeight: 'bold' }}>{quiz.titulo}</p>
                <p style={{ fontSize: '0.8rem', color: '#555' }}>{quiz.emblema?.nome}</p>
                {conquistado && <p style={{ color: 'green', fontSize: '0.8rem' }}>✅ Emblema conquistado</p>}
              </div>
              

            );
            
          })}
        </div>
      </div>
      <div className="emblemas-existentes">
        <p>Veja os emblemas que você pode conquistar:</p>
        <div className="botoes">
          <button>Ver emblemas disponíveis</button>
          <button onClick={() => navigate("/")}>Voltar para Home</button>
        </div>
      </div>
    </AppWrapper>
  );
};

export default ListaQuizzes;
