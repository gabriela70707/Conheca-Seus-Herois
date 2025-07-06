import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.7);
  padding: 2rem;
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
    background-color: #ffcc70;
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
  }

  button:hover {
    background-color: #f9b64d;
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
    border-color: #ffcc70;
    box-shadow: 0 0 10px #ffcc70;
  }
`;

const Mensagem = styled.p`
  color: white;
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
`;


const MeuPersonagem = () => {
  const [personagem, setPersonagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});
  const [imagensDisponiveis, setImagensDisponiveis] = useState([]);
  const token = localStorage.getItem('token');

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
            <input name="periodo" value={form.periodo || ''} onChange={handleChange} placeholder="Período" />
            <input name="genealogia" value={form.genealogia || ''} onChange={handleChange} placeholder="Genealogia" />
            <input name="licoes" value={form.licoes || ''} onChange={handleChange} placeholder="Lições" />
            <input name="livro_principal" value={form.livro_principal || ''} onChange={handleChange} placeholder="Livro principal" />

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
          <>
            {personagem.imagem && <img src={personagem.imagem} alt={personagem.nome} />}
            <h2>{personagem.nome}</h2>
            <p><strong>História:</strong> {personagem.historia}</p>
            <p><strong>Período:</strong> {personagem.periodo}</p>
            <p><strong>Genealogia:</strong> {personagem.genealogia}</p>
            <p><strong>Lições:</strong> {personagem.licoes}</p>
            <p><strong>Livro:</strong> {personagem.livro_principal}</p>
            <button onClick={() => setEditando(true)}>Editar cartinha</button>
          </>
        )}
      </Cartinha>
    </Wrapper>
  );
};

export default MeuPersonagem;
