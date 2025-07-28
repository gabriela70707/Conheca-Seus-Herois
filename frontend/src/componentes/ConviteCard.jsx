import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; //npm install react-router-dom


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  .card {
    width: 300px;
    height: 250px;
    border-radius: 20px;
    background-image: url("https://i.pinimg.com/originals/3f/3f/3f/3f3f3f3f3f3f3f3f3f3f3f3f3f3f.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .texto {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 1rem;
    border-radius: 12px;
    text-align: center;
    z-index: 1;
  }

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  button {
    background-color:rgb(33, 96, 185);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    color: white;
  }

  button:hover {
    background-color:rgb(19, 66, 133);
  }
`;


const ConviteCard = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="card">
        <div className="texto">
          <h2>Você também é parte dessa história</h2>
          <p>Crie sua cartinha e entre para a galeria dos heróis da fé.</p>
          <button onClick={() => navigate('/login')}>Criar minha cartinha</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ConviteCard;
