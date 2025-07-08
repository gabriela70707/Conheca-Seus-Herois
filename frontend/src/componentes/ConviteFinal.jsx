import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 4rem;
  padding: 2rem;
  display: flex;
  justify-content: center;

  .mensagem {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2rem;
    border-radius: 16px;
    text-align: center;
    max-width: 500px;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  button {
    background-color:rgb(33, 96, 185);
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    background-color:rgb(19, 66, 133);
  }
`;


const ConviteFinal = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="mensagem">
        <h2>Já conheceu os heróis...</h2>
        <p>Agora é sua vez de se tornar um.</p>
        <button onClick={() => navigate('/login')}>Entrar ou Criar Conta</button>
      </div>
    </Wrapper>
  );
};

export default ConviteFinal;
