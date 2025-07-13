import styled from "styled-components";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import imagemFooter from '../assets/imagemFooter.png'



const Footer = styled.footer`
  background-color: #1a1a1a;
  color: #ffffff;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  margin-top: auto;
  width: 100vw;
  display: grid;

  a {
    color: #ffffff;
    margin: 0 0.6rem;
    transition: color 0.3s;
  }

  a:hover {
    color: rgb(33, 96, 185);;
  }

  .icons {
    display: grid;
    width: 5vw;
    margin-top: 1.5rem;
    gap: 0.5rem;
    font-size: 1.4rem;
    
  }

  .informacoes{
    display: flex;
    justify-content: center;
    gap: 50vw;
  }

  .primeira-sessao{
    display: flex;
  }

  .links{
    display: grid;
    padding: 2vh;
    gap: 0.5rem;
    width: 20vw;
    align-items: start;
    justify-items: start;

  }
`;

export default function Rodape() {
  return (
    <Footer>
      <div className="informacoes">
        <div className="links">
        <h3>Links Importantes:</h3>
          <a href="https://github.com/gabriela70707" target="_blank" rel="noopener noreferrer">
            Sobre Nós
          </a>

          <a href="https://github.com/gabriela70707" target="_blank" rel="noopener noreferrer">
            <FaInstagram /> Ilustrador Dos Cards
          </a>
          
          <a href="https://github.com/gabriela70707" target="_blank" rel="noopener noreferrer">
            <FaGithub /> Repositório do Projeto
          </a>

        </div>
        <section className="primeira-sessao">
          <div className="icons">
            <a href="https://www.instagram.com/seu_usuario" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/seu_usuario" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com/gabriela70707" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </div>

          <img src={imagemFooter} alt="" style={{ height: '21vh' }} />
        </section>

      </div>
      © {new Date().getFullYear()} Conheça seus Heróis • Desenvolvido por Gabriela Alejandra
    </Footer>
  );
}
