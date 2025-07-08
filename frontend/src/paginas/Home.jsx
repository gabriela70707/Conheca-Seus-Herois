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
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

const AppWrapper = styled.div`
  min-height: 100vh;
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

  .meu-personagem {
    display: flex;
    gap: 5vw;
    flex-wrap: wrap;
  }

  .quizzes, .edicao, .personagem-aleatorio {
    display: grid;
    width: 15vw;
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

  if (loading) {
    return (
      <p style={{ color: "white", textAlign: "center" }}>
        Carregando personagens...
      </p>
    );
  }

  const personagensFiltrados = usuarioPersonagem
    ? personagens.filter((p) => p.id !== usuarioPersonagem.id)
    : personagens.filter((p) => !p.usuario_id);

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
                <p><strong>Conquiste seus emblemas realizando quizzes:</strong></p>
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

      {/* Lista de personagens */}
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
    </AppWrapper>
  );
};

export default Home;
