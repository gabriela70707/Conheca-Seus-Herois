import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, nome, imagem, destaque }) => {

    const navigate = useNavigate();

    return (
        <StyledWrapper imagem={imagem} destaque={destaque}>
            <div onClick={() => navigate(`/personagem/${id}`)} style={{ cursor: 'pointer' }}>
                <div className="container noselect">
                    <div className="canvas">
                        {/* Trackers para efeito 3D */}
                        {Array.from({ length: 25 }, (_, i) => (
                            <div key={i} className={`tracker tr-${i + 1}`} />
                        ))}

                        {/* Brilho atrás do card */}
                        <div className="brilho" />

                        {/* Card com imagem e nome */}
                        <div id="card">
                            {destaque && <div className="faixa-destaque">⭐ Você</div>} 
                            <div className="nome">{nome}</div>
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
};


const StyledWrapper = styled.div`
  ${({ imagem }) => `
    .container {
      position: relative;
      width: 190px;
      height: 254px;
      transition: 200ms;
    }

    .container:active {
      width: 180px;
      height: 245px;
    }

    #card {
      position: absolute;
      inset: 0;
      z-index: 0;
      display: flex;
      justify-content: center;
      align-items: end;
      border-radius: 20px;
      transition: 700ms;
      background-image: url(${imagem});
      background-size: cover;
      background-position: center;
    }

    #card::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2); /* escurece levemente a imagem */
    border-radius: 20px;
    z-index: 1;
    }


    .brilho {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
    filter: blur(3rem);
    opacity: 0.6;
    border-radius: 20px;
    transition: 200ms;
    }
    
    .faixa-destaque {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, #ffcc70, #f9b64d);
    color: #000;
    font-weight: bold;
    padding: 6px 12px;
    border-bottom-right-radius: 12px;
    font-size: 0.9rem;
    z-index: 2;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }


    .nome {
      opacity: 0;
      font-size: 1.2rem;
      font-weight: bold;
      color: white;
      text-shadow: 1px 1px 4px black;
      transition: opacity 300ms ease-in-out;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 8px 12px;
      width: 100%;
    }

    .tracker:hover ~ #card .nome {
      opacity: 1;
    }

    .tracker {
      position: absolute;
      z-index: 200;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .canvas {
      perspective: 800px;
      inset: 0;
      z-index: 200;
      position: absolute;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(5, 1fr);
      gap: 0;
      grid-template-areas:
        "tr-1 tr-2 tr-3 tr-4 tr-5"
        "tr-6 tr-7 tr-8 tr-9 tr-10"
        "tr-11 tr-12 tr-13 tr-14 tr-15"
        "tr-16 tr-17 tr-18 tr-19 tr-20"
        "tr-21 tr-22 tr-23 tr-24 tr-25";
    }

    ${Array.from({ length: 25 }, (_, i) => `
      .tr-${i + 1} { grid-area: tr-${i + 1}; }
    `).join('')}

    /* Efeitos de rotação por área */
    .tr-1:hover ~ #card { transform: rotateX(20deg) rotateY(-10deg); }
    .tr-2:hover ~ #card { transform: rotateX(20deg) rotateY(-5deg); }
    .tr-3:hover ~ #card { transform: rotateX(20deg) rotateY(0deg); }
    .tr-4:hover ~ #card { transform: rotateX(20deg) rotateY(5deg); }
    .tr-5:hover ~ #card { transform: rotateX(20deg) rotateY(10deg); }
    .tr-6:hover ~ #card { transform: rotateX(10deg) rotateY(-10deg); }
    .tr-7:hover ~ #card { transform: rotateX(10deg) rotateY(-5deg); }
    .tr-8:hover ~ #card { transform: rotateX(10deg) rotateY(0deg); }
    .tr-9:hover ~ #card { transform: rotateX(10deg) rotateY(5deg); }
    .tr-10:hover ~ #card { transform: rotateX(10deg) rotateY(10deg); }
    .tr-11:hover ~ #card { transform: rotateX(0deg) rotateY(-10deg); }
    .tr-12:hover ~ #card { transform: rotateX(0deg) rotateY(-5deg); }
    .tr-13:hover ~ #card { transform: rotateX(0deg) rotateY(0deg); }
    .tr-14:hover ~ #card { transform: rotateX(0deg) rotateY(5deg); }
    .tr-15:hover ~ #card { transform: rotateX(0deg) rotateY(10deg); }
    .tr-16:hover ~ #card { transform: rotateX(-10deg) rotateY(-10deg); }
    .tr-17:hover ~ #card { transform: rotateX(-10deg) rotateY(-5deg); }
    .tr-18:hover ~ #card { transform: rotateX(-10deg) rotateY(0deg); }
    .tr-19:hover ~ #card { transform: rotateX(-10deg) rotateY(5deg); }
    .tr-20:hover ~ #card { transform: rotateX(-10deg) rotateY(10deg); }
    .tr-21:hover ~ #card { transform: rotateX(-20deg) rotateY(-10deg); }
    .tr-22:hover ~ #card { transform: rotateX(-20deg) rotateY(-5deg); }
    .tr-23:hover ~ #card { transform: rotateX(-20deg) rotateY(0deg); }
    .tr-24:hover ~ #card { transform: rotateX(-20deg) rotateY(5deg); }
    .tr-25:hover ~ #card { transform: rotateX(-20deg) rotateY(10deg); }

    .noselect {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    ${({ destaque }) => destaque && `
        .container {
            box-shadow: 0 0 20px 5px rgba(255, 204, 112, 0.6);
            border: 2px solid #ffcc70;
            border-radius: 20px;
        }

        #card::after {
            background-color: rgba(0, 0, 0, 0.15); /* um pouco mais leve */
        }

        .brilho {
            opacity: 0.9;
            filter: blur(2rem);
        }
    `}
  `}
`;

export default Card;
