import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import Registro from './paginas/Registro';
import Login from './paginas/Login';
import MeuPersonagem from './paginas/MeuPersonagem';
import DetalhePersonagem from './paginas/DetalhePersonagem'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/me/personagem" element={<MeuPersonagem />}/>
        <Route path="/personagem/:id" element={<DetalhePersonagem />}/>
      </Routes>
  );
}

export default App;
