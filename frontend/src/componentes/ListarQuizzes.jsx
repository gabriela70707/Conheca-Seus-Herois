import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fundo from '../assets/fundo.png';
import styled from 'styled-components';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

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

  .emblemas-existentes {
    display: grid;
    justify-items: start;
    padding: 1.2vw;

    .botoes {
      display: flex;
      gap: 1vw;
    }
  }
`;

const ListaQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [emblemasUsuario, setEmblemasUsuario] = useState([]);
  const [todosEmblemas, setTodosEmblemas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalListaAberto, setModalListaAberto] = useState(false);
  const [emblemaSelecionado, setEmblemaSelecionado] = useState(null);
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
        .then(data => {
          if (Array.isArray(data)) {
            setEmblemasUsuario(data);
          } else {
            console.warn("⚠️ /emblemas/me não retornou um array:", data);
            setEmblemasUsuario([]);
          }
        })
        .catch(err => {
          console.error("Erro ao carregar emblemas do usuário:", err);
          setEmblemasUsuario([]);
        });
    }
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/emblemas`)
      .then(res => res.json())
      .then(data => setTodosEmblemas(data))
      .catch(err => console.error("Erro ao carregar todos os emblemas:", err));
  }, []);

  const idsUsuario = new Set(emblemasUsuario.map(e => Number(e.id)));

  const conquistados = todosEmblemas.filter(e =>
    idsUsuario.has(Number(e.id))
  ).length;

  const total = todosEmblemas.length;
  const porcentagem = total > 0 ? Math.round((conquistados / total) * 100) : 0;

  return (
    <AppWrapper>
      <div style={{ padding: '2rem' }}>
        <div className="info">
          <h2>Quizzes disponíveis</h2>
          <p>Você deve ter percebido que os heróis têm seus emblemas, certo? Você também pode conquistar os seus!</p>
          <p>Realize os quizzes, teste seus conhecimentos e ganhe seus emblemas!</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {quizzes.map((quiz) => {
            const conquistado = idsUsuario.has(Number(quiz.emblema?.id));
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
          <Button variant="contained" onClick={() => setModalListaAberto(true)}>
            Ver emblemas disponíveis
          </Button>
          <Button onClick={() => navigate("/")}>Voltar para Home</Button>
        </div>
      </div>

      <Dialog open={modalListaAberto} onClose={() => setModalListaAberto(false)} maxWidth="md" fullWidth>
        <DialogTitle>Todos os Emblemas</DialogTitle>
        <DialogContent>
          <p style={{ fontWeight: 'bold' }}>
            🏅 Emblemas conquistados: {conquistados} de {total} ({porcentagem}%)
          </p>
          <div style={{
            background: '#ccc',
            borderRadius: '8px',
            overflow: 'hidden',
            height: '10px',
            width: '100%',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: `${porcentagem}%`,
              background: '#4caf50',
              height: '100%',
              transition: 'width 0.3s ease'
            }} />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {todosEmblemas.map((emblema) => {
              const conquistado = idsUsuario.has(Number(emblema.id));
              return (
                <div
                  key={emblema.id}
                  title={emblema.nome}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    overflow: 'hidden',
                  }}
                  onClick={() => {
                    setEmblemaSelecionado(emblema);
                    setModalAberto(true);
                  }}
                >
                  <img
                    src={emblema.icone_url}
                    alt={emblema.nome}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      filter: conquistado ? 'blur(2px)' : 'none',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalListaAberto(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modalAberto} onClose={() => setModalAberto(false)}>
        <DialogTitle>{emblemaSelecionado?.nome}</DialogTitle>
        <DialogContent>
          <div style={{ textAlign: 'center' }}>
            <img
              src={emblemaSelecionado?.icone_url}
              alt={emblemaSelecionado?.nome}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                marginBottom: '1rem',
              }}
            />
            <p>{emblemaSelecionado?.descricao}</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalAberto(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </AppWrapper>
  );
};

export default ListaQuizzes;
