# 📖 Conheça Seus Heróis

> Uma aplicação interativa onde você cria sua própria cartinha de personagem bíblico e descobre os heróis da fé de forma única e personalizada.

![Badge](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Badge](https://img.shields.io/badge/Python-3.11+-blue)
![Badge](https://img.shields.io/badge/React-18+-61DAFB)
![Badge](https://img.shields.io/badge/FastAPI-0.100+-009688)

## 🎯 Sobre o Projeto

**Conheça Seus Heróis** é uma plataforma web que conecta pessoas à Bíblia de forma criativa e interativa. O projeto permite que usuários:

- ✨ Criem sua própria cartinha personalizada contando sua história com Deus
- 📚 Explorem personagens bíblicos com informações detalhadas
- 🏆 Conquistem emblemas através de quizzes sobre os heróis da fé
- 🔍 Filtrem personagens por conflitos e situações específicas
- 🎴 Tenham uma experiência visual única com cards 3D interativos

### 💡 Motivação

O projeto nasceu do desejo de tornar o evangelho acessível a todos, criando uma ponte entre os cristãos e os personagens bíblicos de forma leve e divertida. É também um marco na caminhada espiritual do usuário, onde ele pode se sentir parte da história.

---

## 🚀 Tecnologias Utilizadas

### Backend
- **FastAPI** - Framework web moderno e de alta performance
- **SQLModel** - ORM baseado em Pydantic e SQLAlchemy
- **SQLite/PostgreSQL** - Banco de dados
- **JWT** - Autenticação e autorização
- **Passlib + Bcrypt** - Criptografia de senhas
- **Python-Jose** - Manipulação de tokens JWT

### Frontend
- **React** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool rápido e moderno
- **Styled Components** - Estilização com CSS-in-JS
- **React Router** - Navegação entre páginas
- **Material-UI** - Componentes de interface
- **Canvas Confetti** - Animações de celebração

---

## 📁 Estrutura do Projeto

```
Conheca-Seus-Herois/
│
├── app/
│   ├── models/              # Modelos do banco de dados
│   ├── routes/              # Rotas da API
│   ├── schemas/             # Schemas Pydantic
│   ├── data/                # Dados estáticos
│   ├── database.py          # Configuração do banco
│   ├── security.py          # Autenticação e segurança
│   └── main.py              # Ponto de entrada da API
│
├── frontend/
│   ├── src/
│   │   ├── componentes/     # Componentes React
│   │   ├── paginas/         # Páginas da aplicação
│   │   ├── assets/          # Imagens e recursos
│   │   └── App.jsx          # Componente principal
│   └── public/
│
├── static/                  # Arquivos estáticos (imagens)
└── herois.db               # Banco de dados SQLite
```

---

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Python 3.11+
- Node.js 18+
- npm ou yarn

### Backend

1. Clone o repositório:
```bash
git clone https://github.com/gabriela70707/Conheca-Seus-Herois.git
cd Conheca-Seus-Herois
```

2. Crie um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

3. Instale as dependências:
```bash
pip install fastapi sqlmodel uvicorn passlib python-jose python-multipart
```

4. Inicie o servidor:
```bash
uvicorn app.main:app --reload
```

O backend estará disponível em `http://localhost:8000`

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na pasta `frontend/`:
```
VITE_API_URL=http://localhost:8000
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

---

## 📖 Funcionalidades Principais

### 🔐 Autenticação
- Registro de novos usuários
- Login com JWT
- Rotas protegidas com autenticação

### 👤 Personagens
- Criação automática de personagem ao registrar
- Edição de informações pessoais
- Escolha de avatar personalizado
- Visualização de outros personagens bíblicos

### 🏅 Sistema de Emblemas
- Quizzes sobre personagens bíblicos
- Conquista de emblemas por desempenho
- Visualização de progresso (conquistados vs totais)
- Sistema de recompensas visual

### 🔍 Filtros e Busca
- Filtro por conflitos vividos
- Sorteio aleatório de personagens
- Visualização detalhada de cada herói

### 🎴 Interface Visual
- Cards 3D interativos com efeito hover
- Animações suaves e responsivas
- Design moderno e atraente
- Feedback visual em ações importantes

---

## 🗄️ Modelos do Banco de Dados

### Principais Tabelas

- **Usuario** - Dados de autenticação
- **Personagem** - Informações dos personagens (bíblicos e usuários)
- **Emblema** - Conquistas disponíveis
- **Quiz** - Perguntas e quizzes
- **Pergunta** e **Alternativa** - Estrutura dos quizzes
- **Evento** - Eventos históricos bíblicos
- **Conflito** - Situações e desafios enfrentados

### Relacionamentos

- **PersonagemEmblema** - Emblemas conquistados
- **PersonagemEvento** - Participação em eventos
- **PersonagemConflito** - Conflitos vivenciados
- **PersonagemRelacionamento** - Conexões entre personagens

---

## 🎨 Design e UX

### Paleta de Cores
- Azul Principal: `rgb(33, 96, 185)`
- Azul Escuro: `rgb(19, 66, 133)`
- Fundo Escurecido: `rgba(0, 0, 0, 0.6)`
- Destaque: `#ffcc70` (dourado)

### Componentes Reutilizáveis
- **Card** - Cartinha com efeito 3D
- **BotaoSair** - Logout animado
- **VoltarAoTopo** - Navegação rápida
- **ConviteCard** - Call-to-action para registro
- **Rodape** - Informações e links

---

## 🔒 Segurança

- ✅ Senhas criptografadas com bcrypt
- ✅ Tokens JWT com expiração
- ✅ Validação de entrada com Pydantic
- ✅ Proteção de rotas sensíveis
- ✅ CORS configurado
- ✅ Validação de imagens permitidas

---

## 🚧 Próximas Funcionalidades

- [ ] Sistema de pesquisa de personagens
- [ ] Modo escuro
- [ ] Compartilhamento de cartinhas
- [ ] Ranking de usuários
- [ ] Mais quizzes e emblemas
- [ ] Sistema de notificações
- [ ] Integração com redes sociais

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você quer ajudar:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 👥 Equipe

### Desenvolvedora
**Gabriela Alejandra**
- GitHub: [@gabriela70707](https://github.com/gabriela70707)
- Instagram: [@gabriela_bergamine](https://instagram.com/gabriela_bergamine)

### Ilustrador
**Luciano Ramos**
- Instagram: [@lucianoilustrador](https://instagram.com/lucianoilustrador)

---


## 🙏 Agradecimentos

- A Deus meu melhor amigo, fonte de toda inspiração
- Luciano Ramos, pelas ilustrações incríveis
- Comunidade open source
- Todos que testaram e deram feedback

---

## 📞 Contato

Se tiver dúvidas ou sugestões, entre em contato:

- 📧 Email: [gabrielasantos70707@gmail.com]
- 💼 LinkedIn: [gabriela-alejandra](https://www.linkedin.com/in/gabriela-alejandra-278b39355]
- 📱 Instagram: [@gabriela_bergamine](https://instagram.com/gabriela_bergamine)

---

<div align="center">

**Feito com ❤️ e fé por Gabriela Alejandra**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>
