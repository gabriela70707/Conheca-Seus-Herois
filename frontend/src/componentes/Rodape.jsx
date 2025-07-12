import styled from "styled-components";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = styled.footer`
  background-color: #1a1a1a;
  color: #ffffff;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  margin-top: auto;
  width: 100vw;

  a {
    color: #ffffff;
    margin: 0 0.6rem;
    transition: color 0.3s;
  }

  a:hover {
    color: rgb(33, 96, 185);;
  }

  .icons {
    margin-top: 0.5rem;
    font-size: 1.4rem;
  }
`;

export default function Rodape() {
  return (
    <Footer>
      © {new Date().getFullYear()} Conheça seus Heróis • Desenvolvido por Gabriela Alejandra
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
    </Footer>
  );
}
