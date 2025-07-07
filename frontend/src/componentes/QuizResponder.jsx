import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuizResponder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [emblemaConquistado, setEmblemaConquistado] = useState(null);
  const [emblemaJaTinha, setEmblemaJaTinha] = useState(false);
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

  if (!quiz) return <p style={{ textAlign: 'center' }}>Carregando quiz...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>{quiz.titulo}</h2>
      <p>{quiz.descricao}</p>

      {quiz.perguntas.map((pergunta) => (
        <div key={pergunta.id} style={{ marginBottom: '1.5rem' }}>
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
        backgroundColor: '#ffcc70',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>
        Enviar respostas
      </button>

      {resultado && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Resultado:</h3>
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
        </div>
      )}

      {emblemaConquistado && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2 style={{ color: '#FFD700' }}>🏆 Parabéns!</h2>
          <p>Você conquistou o emblema:</p>
          <div style={{
            animation: 'pulse 1.5s infinite',
            display: 'inline-block',
            margin: '1rem'
          }}>
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
          </div>
          <h3>{emblemaConquistado.nome}</h3>
          <p>{emblemaConquistado.descricao}</p>
          <button onClick={() => navigate('/')} style={{
            marginTop: '1rem',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            backgroundColor: '#ffcc70',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Voltar à Home
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizResponder;
