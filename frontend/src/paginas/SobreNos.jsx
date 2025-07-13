import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import fundo from '../assets/fundo.png'
import imagemSobreNos from '../assets/J&G-SemFundo.png'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
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


const Perfil = styled.div` 
  display: flex; 
  background-color:rgb(233, 234, 236);
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
      height: 27vh; 
      
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
        

        h2{
          font-size: 2.2vh;
        }
    }
    
    
    .icones{
      display: flex; 
      justify-content: center;   
      flex-wrap: wrap;  
      padding: 1vh;


      img{
        padding: 0;
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
      color: black;
      background-color:rgb(233, 234, 236);
      height: 65vh;
      animation: slideFade 0.4s ease;
      padding: 1rem;
      display: grid;
      justify-items: start;
      
      .historia{
        display: grid;
        justify-items: start;
        text-align: justify;
        padding: 1.7vh;
        font-size: 2.2vh;
      }
      
      .link-biblia{
        padding: 1vw;
      }
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
  background-color:rgb(233, 234, 236);
  color: black; 
  height: 85%; 
  box-shadow: 0 0 20px rgba(0,0,0,0.3); 
  border-radius: 16px; 
  justify-content: center;
  margin-left: 2vw;
`;

const ImagemContainer = styled.div`
  position: relative;
  display: inline-block;
  
  img {
    height: 11vh;
    border-radius: 50%;
    transition: transform 0.2s;
    }
    
    .nome {
      position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0,0,0,0.7);
    color: white;
    padding: 0.3rem 0.6rem;
    border-radius: 8px;
    font-size: 0.8rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    }
    
    &:hover .nome {
      opacity: 1;
  }
  `;


const Mensagem = styled.p` 
  color: white; 
  text-align: center; 
  margin-top: 4rem; 
  font-size: 1.2rem; 
  `;

const SobreNos = () => {
  const { id } = useParams();
  const [personagem, setPersonagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [emblemas, setEmblemas] = useState([]);
  const [eventos, setEventos] = useState([])
  const [relacionamentos, setRelacionamentos] = useState([])
  const [secaoAtiva, setSecaoAtiva] = useState('historia');
  const [usuarioPersonagem, setUsuarioPersonagem] = useState(null);
  const token = localStorage.getItem("token");
  const [emblemaSelecionado, setEmblemaSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();


  return (
    <Wrapper>
      <Perfil>
        <div className="personagem">
          <img src={imagemSobreNos} alt="Ilustração De Jesus" />
          <div className="nome">
            <p>Olá, meu nome é </p>
            <h2>Gabriela Alejandra</h2>
          </div>
        </div>
        <div className="emblemas">
          <h2>Emblemas:</h2>
          <div className="icones">

              <div>
                <img
                  src={fundo}
                  alt=""
                  style={{
                    width: '65px',
                    height: '65px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>

          </div>
        </div>
      </Perfil>


      <Informacoes>

        <Bio>
          <p>
            <strong>Pessoas que me inspiram na minha vida com Deus</strong>
            genealogia
          </p>
          <p><strong>Período:</strong> periodo</p>

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
                <section className='historia'>
                  <p>historia</p>



                </section>
                <p className='link-biblia'>
                 biblia
                </p>
              </>
            )}
              <p><strong>Lições:</strong>licoes</p>

              <div className="eventos">
                {eventos.length > 0 ? (
                  eventos.map((evento) => (
                    <div key={evento.id} style={{ marginBottom: '1rem' }}>
                      <h3>{evento.titulo}</h3>
                      <p><strong>Local:</strong> local</p>
                      <p><strong>Descrição:</strong> descricao</p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#555' }}><em>Nenhum evento registrado para este personagem.</em></p>
                )}
              </div>
            

          </div>
        </Cartao>

      </Informacoes>
    </Wrapper>
  );
};

export default SobreNos;
