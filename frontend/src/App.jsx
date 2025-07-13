import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import Registro from './paginas/Registro';
import Login from './paginas/Login';
import MeuPersonagem from './paginas/MeuPersonagem';
import DetalhePersonagem from './paginas/DetalhePersonagem'
import QuizResponder from './componentes/QuizResponder';
import ListaQuizzes from './componentes/ListarQuizzes';
import SobreNos from './paginas/SobreNos';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/me/personagem" element={<MeuPersonagem />}/>
        <Route path="/personagem/:id" element={<DetalhePersonagem />}/>
        <Route path="/quiz/:id" element={<QuizResponder />}/>
        <Route path="/quizzes" element={<ListaQuizzes />}/>
        <Route path="/sobre-nos" element={<SobreNos />}/>
      </Routes>
  );
}

export default App;
