import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.7);
  padding: 2rem;
`;

const Cartao = styled.div`
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

  h2 {
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }
`;

const Mensagem = styled.p`
  color: white;
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
`;


const DetalhePersonagem = () => {
  const { id } = useParams();
  const [personagem, setPersonagem] = useState(null);
  const [erro, setErro] = useState(null);

  const [emblemas, setEmblemas] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/personagens-emblemas/personagem/${id}/emblemas`)
      .then(res => res.json())
      .then(data => setEmblemas(data))
      .catch(err => console.error("Erro ao carregar emblemas:", err));
  }, [id]);


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/personagens/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || 'Erro ao buscar personagem');
        }
        return res.json();
      })
      .then(data => setPersonagem(data))
      .catch(err => setErro(err.message));
  }, [id]);

  if (erro) return <Mensagem>{erro}</Mensagem>;
  if (!personagem) return <Mensagem>Carregando personagem...</Mensagem>;

  return (
    <Wrapper>
      <Cartao>
        {personagem.imagem && <img src={personagem.imagem} alt={personagem.nome} />}
        <h2>{personagem.nome}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {emblemas.map((e) => (
            <div key={e.id} title={e.nome}>
              <img
                src={e.icone_url}
                alt={e.nome}
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '2px solid gold',
                  boxShadow: '0 0 6px rgba(255, 204, 112, 0.6)',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
          ))}
        </div>


        <p><strong>História:</strong> {personagem.historia}</p>
        <p><strong>Período:</strong> {personagem.periodo}</p>
        <p><strong>Genealogia:</strong> {personagem.genealogia}</p>
        <p><strong>Lições:</strong> {personagem.licoes}</p>
        <p><strong>Livro principal:</strong> {personagem.livro_principal}</p>
      </Cartao>
    </Wrapper>
  );
};

export default DetalhePersonagem;
