import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.7);

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
  }

  input {
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  button {
    background-color: #ffcc70;
    border: none;
    padding: 0.6rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }

  button:hover {
    background-color: #f9b64d;
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
        localStorage.setItem('token', data.access_token); // ✅ nome correto do campo
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
      </form>
    </Wrapper>
  );
};

export default Login;
