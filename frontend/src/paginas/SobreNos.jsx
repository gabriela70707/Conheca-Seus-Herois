import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import fundo from '../assets/fundo.png'
import jesusComLapis from '../assets/jesusComLapis.png'
import verMais from '../assets/iconeVerMais.png'
import jesusComBalao from '../assets/jesusBalao.png'
import gabrielaFoto from '../assets/gabriela-sobre-nos.png'
import lucianoFoto from '../assets/luciano-sobre-nos.png'
import jesusFazendoCoracao from '../assets/jesusFazendoCoracao.png'
import { useNavigate } from 'react-router-dom';
import VoltarAoTopo from "../componentes/VoltarAoTopo";



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
    background: rgba(255, 255, 255, 0.74); 
    z-index: 0; 
    } 
    
    > * { 
      position: relative; 
      z-index: 1; 
      } 
  `;


const Perfil = styled.div` 
  display: flex; 
  background: linear-gradient(to right, #4B72D5 28%, #0E38A1 69%, #0E38A1 100%);
  border-radius: 15px; 
  margin-top: 13vh; 
  color: black; 
  width: 80vw; 
  height: 30vh; 
  align-items: end; 
  justify-content: space-around; 
  
  img { 
    height: 45vh; 
    transform: scaleX(-1);
    } 
      
  .titulo{ 
    display: grid; 
    justify-items: center;
    align-items: start;
    color: white;
    height: 30vh
    

    h1, h2{ 
      margin: 0px; 
      padding: 0px;
      box-sizing: border-box; 
    } 
  }

  
`;

const VerMais = styled.div` 
  display: grid; 
  color: rgba(45, 82, 173, 1);
  justify-items: center;
  font-size: 3vh;
  font-family: "League Gothic", sans-serif;
  padding: 15vh;

  .linkagem{
    display: grid;
    justify-items: center;
    cursor: pointer;
  }
`;

const Navegacao = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    .conteudo{
      border: solid 2px red;

      h2{
        color: rgba(14, 55, 160, 1);
        font-family: 'Lilita One', cursive;
      }
      
      p{
        color: rgba(33, 33, 33, 1);
        font-family: "AR One Sans";
      }

      .nick{
        color: rgba(21, 21, 21, 1);
        font-family: 'Lilita One', cursive;

        h3{
          font-size: 2.8vh;
        }
        
        h4{
          font-size: 2vh;
        }

        img{
          height: 22vh;
        }
      }
    }
  
    
  .vetor {
    position: fixed;
    top: 25%;
    left: 90%;
    transform: translateX(-50%);
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
    pointer-events: none;
  }

.vetor img {
  height: 50vh;
  object-fit: contain;
}

`;

const Agradecimento = styled.div`

`;

const SobreNos = () => {
  const navigate = useNavigate();

  useEffect(() => {
  const img = document.querySelector('.vetor img');
  const conteudo = document.querySelector('.conteudo');

  if (!img || !conteudo) return;

  const conteudoTop = conteudo.offsetTop;
  const conteudoHeight = conteudo.offsetHeight;

  let animationFrameId;

  const animate = () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // progresso da rolagem no conteúdo (0 até 1)
    const scrollProgress = Math.min(
      Math.max((scrollY - conteudoTop + viewportHeight) / (conteudoHeight + viewportHeight),
      0),
      1
    );

    // movimento de até 100px pra ilustrar — você pode aumentar ou suavizar
    const translateY = scrollProgress * 100;

    img.style.transform = `translate(-50%, ${translateY}px)`;

    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(animationFrameId);
}, []);




  return (
    <Wrapper>
      <Perfil>
        <img src={jesusComLapis} alt="vetor de Jesus segurando um lapís" />
        <div className="titulo">
          <h1>Conheça Seus Heroís</h1>
          <h2>Sobre Nós</h2>
        </div>
      </Perfil>

      <VerMais>
        <h3><strong>Entenda como essa aventura começou ...</strong></h3>
        <div className="linkagem">
          <img src={verMais} alt="icone ver mais" />
          <h3><strong>Ver Mais</strong></h3>
        </div>
      </VerMais>

      <Navegacao>
        <div className="conteudo">
          <div className="como-nasceu-projeto">
            <h2>Como Nasceu o Projeto?</h2>
            <p>
              djalkdjalskdjlasdkjalskdjsald
            </p>

          </div>

          <div className="missao-visao-valores">
            <h2>Missão, Visão e Valores</h2>
            <p>
              lçdkssçaldkasçdkasçdkç
            </p>
          </div>

          <div className="desenvolvedora">
            <h2>Desenvolvedora</h2>

            <div className="nick">
              <img src={gabrielaFoto} alt="Foto da Gabriela, desenvolvedora" />
              <h3>Gabriela Alejandra</h3>
              <h4>@gabriela_bergamine</h4>
            </div>
          </div>

          <p>kdjlasdjlasdjlasjdl</p>

          <div className="ilustrador">

            <div className="nick">
              <img src={lucianoFoto} alt="Foto Luciano, ilustrador" />
              <h3>Luciano Ramos</h3>
              <h4>@lucianoilustrador</h4>
            </div>

            <p>dasdasdasdasdas</p>

          </div>
        </div>

        <div className="vetor">
          <img src={jesusComBalao} alt="Jesus com Balão" />
        </div>

      </Navegacao>

      <Agradecimento>
        <img src={jesusFazendoCoracao} alt="Vetor de Jesus fazendo coração" />
        <div className="redirecionamento">
          <h3>Obrigada por chegar até aqui!</h3>
          <button>Voltar a Home</button>
        </div>
      </Agradecimento>

      <div>
        <VoltarAoTopo />
      </div>

    </Wrapper>
  );
};

export default SobreNos;
