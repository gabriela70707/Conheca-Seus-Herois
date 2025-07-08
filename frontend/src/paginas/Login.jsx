import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import fundo from "../assets/fundo.png"

const Wrapper = styled.div`
  background-image: url(${fundo});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

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
  }

  h2 {
    margin-bottom: 1rem;
    text-align: center;
    color: black;
  }

  input {
    padding: 0.8rem;
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

  .registrar{
    color: black;
    display: flex;
    justify-content: center;

    button{
      background-color: transparent;
      color: rgb(19, 66, 133);
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem('token', data.access_token);
        console.log("Token salvo:", data.access_token);
        alert('Login realizado com sucesso!');
        navigate('/me/personagem');
      } else {
        alert(`Erro ao logar: ${data.detail || 'verifique os dados'}`);
      }
    } catch (err) {
      console.error('Erro de conexão:', err);
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleLogin}>
        <h2>Entrar</h2>
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
        <button type="submit">Entrar</button>

        <div className="registrar">
          <p>Ainda não tem conta? </p>
          <button onClick={() => {navigate("/registro")}}>Registre-se</button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Login;
