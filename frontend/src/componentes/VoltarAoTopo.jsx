import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Botao = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 1rem;
  background-color:rgb(33, 96, 185);
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  transition: background-color 0.3s;

  &:hover {
    background-color:rgb(19, 66, 133);
  }
`;


const VoltarAoTopo = () => {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => {
      setVisivel(window.scrollY > 300);
    };

    window.addEventListener('scroll', aoRolar);
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  const rolarParaTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    visivel && (
      <Botao onClick={rolarParaTopo}>
        ↑ Topo
      </Botao>
    )
  );
};

export default VoltarAoTopo;
