import React, { useEffect, useState,  } from 'react';
import styled from 'styled-components';
import fundo from '../assets/fundo.png'
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  min-height: 100vh; 
  max-width: 100vw; 
  background-image: url(${fundo}); 
  background-size: cover; 
  background-position: center; 
  background-attachment: fixed; 
  position: relative; 
  overflow: hidden; 
  display: grid; 
  justify-content: center; 
  padding: 1rem; 

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

const Cartinha = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 500px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
  text-align: center;


  img {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  input, textarea {
    width: 100%;
    padding: 0.6rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  button {
    background-color:rgb(33, 96, 185);
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
  }

  button:hover {
    background-color:rgb(19, 66, 133);
  }
`;

const Galeria = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: 0.2s;
  }

  img.selecionada {
    border-color:rgb(11, 26, 86);
    box-shadow: 0 0 10px rgb(112, 145, 255);
  }
`;

const Mensagem = styled.p`
  color: aqua;
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
`;

const Informacoes = styled.div`
  color: black;
  text-align: center;
  margin-top: 4rem;
  font-size: 1rem;

  .botoes{
    display: flex;
    gap: 1vw;
    justify-content: center;
  }

`;

const MeuPersonagem = () => {
  const [personagem, setPersonagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});
  const [imagensDisponiveis, setImagensDisponiveis] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/quizzes/publicos`)
    .then(res => res.json())
    .then(data => setQuizzes(data))
    .catch(err => console.error("Erro ao carregar quizzes:", err));
}, []);


  useEffect(() => {
    if (!token) {
      setErro('Você precisa estar logado para ver sua cartinha.');
      return;
    }

    // Buscar personagem
    fetch(`${import.meta.env.VITE_API_URL}/me/personagem`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || 'Erro ao buscar personagem');
        }
        return res.json();
      })
      .then((data) => {
        setPersonagem(data);
        setForm(data);
      })
      .catch((err) => setErro(err.message));

    // Buscar imagens disponíveis
    fetch(`${import.meta.env.VITE_API_URL}/imagens-personagens`)
      .then(res => res.json())
      .then(data => setImagensDisponiveis(data))
      .catch(err => console.error("Erro ao carregar imagens:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvarEdicao = async () => {
    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/me/personagem`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        setPersonagem(data.personagem);
        setEditando(false);
        alert(data.mensagem);
      } else {
        alert(`Erro ao atualizar: ${data.detail || 'verifique os dados'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar alterações.');
    }
  };

  if (erro) return <Mensagem>{erro}</Mensagem>;
  if (!personagem) return <Mensagem>Carregando sua cartinha...</Mensagem>;

  return (
    <Wrapper>
      <Cartinha>
        {editando ? (
          <>
            <input name="nome" value={form.nome || ''} onChange={handleChange} placeholder="Nome" />
            <textarea name="historia" value={form.historia || ''} onChange={handleChange} placeholder="História" />
            <input name="periodo" value={form.periodo || ''} onChange={handleChange} placeholder="Período (Seu ano de Nascimento - Presente)" />
            <input name="genealogia" value={form.genealogia || ''} onChange={handleChange} placeholder="Pessoas que te inspiram em sua vida com Deus" />
            <input name="licoes" value={form.licoes || ''} onChange={handleChange} placeholder="Lições que aprendeu com o Senhor" />
            <input name="livro_principal" value={form.livro_principal || ''} onChange={handleChange} placeholder="Seu versiculo favorito" />

            <div>
              <p><strong>Escolha uma imagem:</strong></p>
              <Galeria>
                {imagensDisponiveis.map((img) => (
                  <img
                    key={img.url}
                    src={img.url}
                    alt={img.nome}
                    className={form.imagem === img.url ? 'selecionada' : ''}
                    onClick={() => setForm({ ...form, imagem: img.url })}
                  />
                ))}
              </Galeria>
            </div>

            <button onClick={salvarEdicao}>Salvar</button>
          </>
        ) : (
          <Informacoes>
            {personagem.imagem && <img src={personagem.imagem} alt={personagem.nome} />}
            <h2>{personagem.nome}</h2>
            <p><strong>Minha História com Deus:</strong> {personagem.historia}</p>
            <p><strong>Período:</strong> {personagem.periodo}</p>
            <p><strong>Pessoas que me inspiram na minha com Deus:</strong> {personagem.genealogia}</p>
            <p><strong>Lições que aprendi com o Senhor:</strong> {personagem.licoes}</p>
            <p><strong>Meu Versiculo Favorito:</strong> {personagem.livro_principal}</p>
            <div className="botoes">
              <button onClick={() => setEditando(true)}>Editar cartinha</button>
              <button onClick={() => navigate('/')}>Voltar a Home</button>
            </div>
          </Informacoes>
        )}
        
      </Cartinha>
    </Wrapper>
  );
};

export default MeuPersonagem;
