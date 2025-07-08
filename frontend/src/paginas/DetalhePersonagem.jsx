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
    align-items: center; 
  } 

  img { 
    padding: 0 2vw; 
    height: 20vh; 
    border-radius: 50%; 
  } 

  .nome{ 
    display: grid; 
    font-size: 2vh; 
    justify-items: start; 
    height: 10vh; 

    h2, p{ 
      margin: 0; 
      box-sizing: border-box; 
    } 
  }

  .emblemas{
    display: grid;
    justify-items: center; 
    width: 30vw;
    margin-right: 7vw;
    height: 80%;


    .icones{
      display: flex; 
      justify-content: center; 
      gap: 0.5rem;  
      flex-wrap: wrap;  
      margin-top: 0rem;  
    }

    h2{
      font-size: 2.2vh;
    }
  } 

`;

const Informacoes = styled.div` 
  display: grid; 
  align-items: end; 
  justify-content: space-between; 
  grid-template-columns: 300px 750px; 
  height: 90vh; 
`;

const Cartao = styled.div` 
  display: grid;
  justify-content: center;
  border-radius: 16px;
  max-width: 700px;
  text-align: center;
  height: 90%;
  align-content: end;

  img { 
    width: 100%; 
    margin-bottom: 1rem; 
  } 

  h2 { 
    color: black; 
  } 

  p { 
    margin: 0.5rem 0; 
    color: black; 
  } 

.conteudo {
    border-radius: 16px;
    background-color: white;
    height: 65vh;
    animation: slideFade 0.4s ease;
    padding: 1rem;
  }

  @keyframes slideFade {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

 .botoes {
    display: flex;
    gap: 3vw;
    height: 7vh;
    margin-bottom: 2rem;

    button {
      background-color: rgba(24, 96, 178, 0.3);
      color: black;
      width: 12vw;
      transition: background-color 0.3s ease;

      &.ativo {
        background-color: rgba(24, 96, 178, 0.88);
        color: white;
      }
    }
  }
`;

const Bio = styled.div` 
    display: grid;
    background-color: white; 
    color: black; 
    height: 85%; 
    box-shadow: 0 0 20px rgba(0,0,0,0.3); 
    border-radius: 16px; 
    justify-content: center;
    margin-left: 2vw;
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
  const [secaoAtiva, setSecaoAtiva] = useState('historia');


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
        <div className="emblemas">
          <h2>Emblemas:</h2>
          <div className="icones">

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
          <p><strong>Seguido Por:</strong></p>
        </Bio>

        <Cartao>
          <div className="botoes">
            <button
              className={secaoAtiva === 'historia' ? 'ativo' : ''}
              onClick={() => setSecaoAtiva('historia')}
            >
              Minha História
            </button>
            <button
              className={secaoAtiva === 'eventos' ? 'ativo' : ''}
              onClick={() => setSecaoAtiva('eventos')}
            >
              Eventos Marcantes
            </button>
            <button
              className={secaoAtiva === 'licoes' ? 'ativo' : ''}
              onClick={() => setSecaoAtiva('licoes')}
            >
              Lições
            </button>
          </div>

          <div className="conteudo">
            {secaoAtiva === 'historia' && (
              <>
                <p><strong>História:</strong> {personagem.historia}</p>
                <p><strong>Livro principal:</strong> {personagem.livro_principal}</p>
              </>
            )}
            {secaoAtiva === 'licoes' && (
              <p><strong>Lições:</strong> {personagem.licoes}</p>
            )}
            {secaoAtiva === 'eventos' && (
              <p><em>Eventos marcantes em construção…</em></p>
            )}
          </div>
        </Cartao>

      </Informacoes>
    </Wrapper>
  );
};

export default DetalhePersonagem;
