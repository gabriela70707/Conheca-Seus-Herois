import React, { useState } from 'react';
import styled from 'styled-components';
import fundo from "../assets/fundo.png"
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;    
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

  form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 300px;
    color: black;
  }

  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }

  input {
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  button {
    background-color:rgb(33, 96, 185);
    border: none;
    padding: 0.6rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }

  button:hover {
    background-color:rgb(19, 66, 133);
  }

  .logar{
    color: black;
    display: flex;
    justify-content: center;

    button{
      background-color: transparent;
      color: rgb(19, 66, 133);
    }
  }
`;


const Registro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (resposta.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login'); // redireciona para a tela de login
      } else {
        const erro = await resposta.json();
        alert(`Erro ao cadastrar: ${erro.detail || 'verifique os dados'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h2>Crie sua conta</h2>
        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>

        <div className="logar">
          <p>Já tem conta? </p>
          <button onClick={() => {navigate("/login")}}>Login</button>
        </div>

      </form>
    </Wrapper>
  );
};

export default Registro;
