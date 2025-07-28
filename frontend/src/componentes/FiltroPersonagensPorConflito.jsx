import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

/**
 * Componente de filtro por conflito.
 * Recebe o estado de conflito selecionado e a função para atualizá-lo via props.
 */
function FiltroPersonagensPorConflito({
  conflitoSelecionado,
  setConflitoSelecionado,
}) {
  const [conflitos, setConflitos] = useState([]);

  // Busca todos os conflitos disponíveis
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/conflitos`)
      .then((res) => res.json())
      .then((data) => setConflitos(data))
      .catch((err) => console.error("Erro ao buscar conflitos:", err));
  }, []);

  return (
    <div className="container" style={{width:'60vw', display:'flex', justifyContent:'end'}}>
      <div style={{ padding: "1rem", display:'grid', width:'15vw' }}>
          <Typography
            variant="h6"
            gutterBottom
            style={{ textAlign: "center", color: "#fff" , fontSize:'1.8vh', padding:'1vh'}}
          >
            Filtrar personagens por conflito:
          </Typography>

          <FormControl fullWidth style={{ marginBottom: "1rem" }}>
            <InputLabel
              id="select-conflito-label"
              style={{ color: "white", fontSize : '1.8vh'}}
            >
              Selecionar conflito
            </InputLabel>
            <Select
              labelId="select-conflito-label"
              value={conflitoSelecionado}
              label="Selecionar conflito"
              onChange={(e) => setConflitoSelecionado(e.target.value)}
              sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", borderRadius: "6px", color:'white'}}
            >
              <MenuItem value="">Todos</MenuItem>
              {conflitos.map((conf) => (
                <MenuItem key={conf.id} value={conf.id}>
                  {conf.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      </div>
    </div>
  );
}

export default FiltroPersonagensPorConflito;
