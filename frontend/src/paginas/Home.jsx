import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Card from "../componentes/Card";
import ConviteCard from "../componentes/ConviteCard";
import ConviteFinal from "../componentes/ConviteFinal";
import VoltarAoTopo from "../componentes/VoltarAoTopo";
import { usePersonagens } from "../hooks/usePersonagens";
import fundo from "../assets/fundo.png";
import ButtonSair from "../componentes/BotaoSair";
import FiltroPersonagensPorConflito from "../componentes/FiltroPersonagensPorConflito";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Rodape from '../componentes/Rodape'

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex
  flex-direction: column;
  background-image: url(${fundo});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  justify-items: center;
  align-items: center;

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
  
  p{
    color: white;
  }

  .meu-personagem {
    display: flex;
    gap: 5vw;
    font-size: 2.2vh;
    justify-content: space-around;
    margin-bottom: 4vh;
    width: 100vw;
    align-items: start;
    padding: 2vh;
      
    button{
      text-align: center;
      background-color:rgb(33, 96, 185);
      color: white;
    }
  
    button:hover{
      background-color:rgb(19, 66, 133);
    }
      
  }

  .quizzes, .edicao, .personagem-aleatorio {
    display: grid;
    width: 15vw;
  }
  
  .personagem-aleatorio{
    button{
      width: 17vw;
      height: 6vh;
      background-color:rgb(33, 96, 185);
    }
    
    button:hover{
      background-color:rgb(19, 66, 133);
    }
    
  }
`;

const Home = () => {
  const { personagens, loading } = usePersonagens();
  const [usuarioPersonagem, setUsuarioPersonagem] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [emblemasUsuario, setEmblemasUsuario] = useState([]);
  const [personagemSorteado, setPersonagemSorteado] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Mensagem e Modal de saída
  const [mensagemSaida, setMensagemSaida] = useState("");
  const [openModal, setOpenModal] = useState(false);

  //filtro de personagens com base nos conflitos
  const [personagensFiltrados, setPersonagensFiltrados] = useState([]);
  const [conflitoSelecionado, setConflitoSelecionado] = useState("");
  

  const handleLogout = () => {
    setMensagemSaida("Nos vemos na próxima!✨");
    setOpenModal(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setOpenModal(false);
      navigate(0); // força reload
    }, 2000);
  };

  const sortearPersonagem = () => {
    const lista = personagensFiltrados;
    if (lista.length === 0) return;
    const aleatorio = lista[Math.floor(Math.random() * lista.length)];
    setPersonagemSorteado(aleatorio);
  };

  
  useEffect(() => {
    if (usuarioPersonagem) {
      fetch(`${import.meta.env.VITE_API_URL}/quizzes/publicos`)
        .then((res) => res.json())
        .then((data) => setQuizzes(data));

      fetch(`${import.meta.env.VITE_API_URL}/emblemas/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setEmblemasUsuario(data.map((e) => e.id)));
    }
  }, [usuarioPersonagem]);

  useEffect(() => {
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/me/personagem`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => setUsuarioPersonagem(data))
        .catch(() => setUsuarioPersonagem(null));
    }
  }, [token]);

    useEffect(() => {
    const url = conflitoSelecionado
      ? `${import.meta.env.VITE_API_URL}/personagens-conflitos/conflito/${conflitoSelecionado}/personagens`
      : `${import.meta.env.VITE_API_URL}/personagens`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtrados = usuarioPersonagem
          ? data.filter((p) => p.id !== usuarioPersonagem.id)
          : data.filter((p) => !p.usuario_id);
        setPersonagensFiltrados(filtrados);
      });
  }, [conflitoSelecionado, usuarioPersonagem]);

  if (loading) {
    return (
      <p style={{ color: "white", textAlign: "center" }}>
        Carregando personagens...
      </p>
    );
  }


  return (
    <AppWrapper>
      {!usuarioPersonagem && <ConviteCard />}

      <Dialog open={openModal}>
        <DialogTitle><strong>Até breve!</strong></DialogTitle>
        <DialogContent>{mensagemSaida}</DialogContent>
      </Dialog>

      {usuarioPersonagem && (
        <section style={{ marginBottom: "2rem", textAlign: "center" }}>
          <h2 style={{ color: "white" }}>Sua cartinha:</h2>
          <ButtonSair onLogout={handleLogout} />

          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}>
            <div className="meu-personagem">
              <div className="quizzes">
                <p><strong>Conquiste seus emblemas:</strong></p>
                <button onClick={() => navigate("/quizzes")}>
                  Ver todos os quizzes
                </button>
              </div>

              <div className="edicao">
                <p><strong>Edite seu personagem:</strong></p>
                <button onClick={() => navigate("/me/personagem")}>
                  Editar Minha Cartinha
                </button>
              </div>

              <div className="personagem-aleatorio">
                <p><strong>Sorteie um personagem:</strong></p>
                <button onClick={sortearPersonagem}>
                  Conhecer um personagem
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

       <h2 style={{ textAlign: "center", color: "white" }}>
        Conheça seus heróis:
      </h2>
      <p>Descubra os personagens que enfrentaram sentimentos parecidos com o que muitas vezes enfrentamos:</p>

      {/* Filtro por conflito */}
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <FiltroPersonagensPorConflito
          conflitoSelecionado={conflitoSelecionado}
          setConflitoSelecionado={setConflitoSelecionado}
        />
      </div>

      {/* Personagem sorteado */}
      {personagemSorteado && (
        <section style={{ margin: "2rem 0", textAlign: "center" }}>
          <h3 style={{ color: "white" }}>Conheça o(a):</h3>
          <Link
            to={`/personagem/${personagemSorteado.id}`}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <Card
              id={personagemSorteado.id}
              nome={personagemSorteado.nome}
              imagem={personagemSorteado.imagem}
            />
          </Link>
        </section>
      )}

      {/* Lista de personagens filtrados */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "center",
      }}>
        {usuarioPersonagem && (
          <Card
            id={usuarioPersonagem.id}
            nome={usuarioPersonagem.nome}
            imagem={usuarioPersonagem.imagem}
            destaque
          />
        )}

        {personagensFiltrados.map((p) => (
          <Card key={p.id} id={p.id} nome={p.nome} imagem={p.imagem} />
        ))}
      </div>

      {!usuarioPersonagem && <ConviteFinal />}
      <VoltarAoTopo />
      <Rodape />
    </AppWrapper>
  );
};

export default Home;