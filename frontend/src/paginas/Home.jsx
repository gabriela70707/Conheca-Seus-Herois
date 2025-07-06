import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../componentes/Card';
import ConviteCard from '../componentes/ConviteCard';
import ConviteFinal from '../componentes/ConviteFinal';
import VoltarAoTopo from '../componentes/VoltarAoTopo';
import { usePersonagens } from '../hooks/usePersonagens';
import fundo from '../assets/fundo.png';

const AppWrapper = styled.div`
  min-height: 100vh;
  background-image: url(${fundo});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;

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

const Home = () => {
  const { personagens, loading } = usePersonagens();
  const [usuarioPersonagem, setUsuarioPersonagem] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/me/personagem`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => setUsuarioPersonagem(data))
        .catch(() => setUsuarioPersonagem(null));
    }
  }, [token]);

  if (loading) return <p style={{ color: 'white', textAlign: 'center' }}>Carregando personagens...</p>;

  //Evitar duplicação da cartinha do usuario
  const personagensFiltrados = usuarioPersonagem
  ? personagens.filter(p => p.id !== usuarioPersonagem.id)
  : personagens;


  return (
    <AppWrapper>
      {!usuarioPersonagem && <ConviteCard />}

      {usuarioPersonagem && (
        <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: 'white' }}>Sua cartinha:</h2>
          <Card
            id={usuarioPersonagem.id}
            nome={usuarioPersonagem.nome}
            imagem={usuarioPersonagem.imagem}
            destaque
          />
        </section>
      )}

      <h2 style={{ textAlign: 'center', color: 'white' }}>Conheça seus heróis:</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {personagensFiltrados.map(p => (
          <Card key={p.id} id={p.id} nome={p.nome} imagem={p.imagem} />
        ))}
      </div>

      {!usuarioPersonagem && <ConviteFinal />}
      <VoltarAoTopo />
    </AppWrapper>
  );
};

export default Home;
