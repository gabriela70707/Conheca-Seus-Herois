import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '2rem' }}>
      <h2>🎯 Quizzes disponíveis</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {quizzes.map((quiz) => {
          const conquistado = emblemasUsuario.includes(quiz.emblema?.id);
          return (
            <div
              key={quiz.id}
              onClick={() => navigate(`/quiz/${quiz.id}/`)}
              style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '12px',
                width: '200px',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
              }}
            >
              <img
                src={quiz.emblema?.imagem}
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
  );
};

export default ListaQuizzes;
