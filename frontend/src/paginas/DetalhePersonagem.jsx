import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import fundo from '../assets/fundo.png'

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

  const Bio = styled.div`
    background-color: white;
    color: black;
    height: 100%;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
    border-radius: 16px;
  `;

const Perfil = styled.div`
  display: flex;
  background-color: white;
  border-radius: 15px;
  padding: 3vh;
  color: black;
  width: 90vw;
  height: 20vh;
  align-items: center;
  justify-content: space-between;
  
  .personagem{
    display: flex;  
  }

  img {
    padding: 0 2vw;
    height: 20vh;
    border-radius: 50%;
  }
  
  .nome{
    display: grid;
  }
`;
const Informacoes = styled.div`
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 200px 700px;
  border: solid 2px red;
  height: 100%;
`;

const Cartao = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 700px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
  text-align: center;
  height: 100%;

  img {
    width: 100%;
    margin-bottom: 1rem;
  }

  h2 {
    color: black;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
    color: black;
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
      <Perfil>
        <div className="personagem">
          {personagem.imagem && <img src={personagem.imagem} alt={personagem.nome} />}
          <div className="nome">
            <p>Olá, meu nome é </p>
            <h2>{personagem.nome}</h2>
          </div>
        </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <div className="emblemas">
              <h2>Emblemas:</h2>
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
          </div>
        </Perfil>
      
      <Informacoes>

        <Bio>
          <p><strong>Genealogia:</strong> {personagem.genealogia}</p>
          <p><strong>Período:</strong> {personagem.periodo}</p>
        </Bio>

        <Cartao>
          <div className="botoes">
            <button>Minha História</button>
            <button>Eventos Marcantes</button>
            <button>Lições</button>
          </div>
          <p><strong>História:</strong> {personagem.historia}</p>

          <p><strong>Lições:</strong> {personagem.licoes}</p>
          <p><strong>Livro principal:</strong> {personagem.livro_principal}</p>
        </Cartao>
        
      </Informacoes>
    </Wrapper>
  );
};

export default DetalhePersonagem;
