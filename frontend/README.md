# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


🎯 Objetivo da apresentação
Mostrar que você aplicou princípios sólidos de back-end no seu projeto, com clareza, propósito e boas práticas — e que está pronta para atuar como back-end developer ou fullstack com confiança.

🧱 Estrutura sugerida da apresentação
🪪 Slide 1: Quem sou eu
Nome, cargo atual (se quiser), e o objetivo da apresentação

Uma frase pessoal: “Esse foi um dos projetos em que mais coloquei meu coração — e quero mostrar como ele reflete minha evolução como desenvolvedora.”

🚀 Slide 2: Visão geral do projeto
Nome do projeto: "Conheça Seus Heróis"

O que ele faz: “Uma aplicação onde o usuário cria sua própria cartinha de personagem bíblico e descobre outros heróis da fé.”

Tecnologias usadas:

Frontend: React, Styled Components

Backend: FastAPI, SQLModel, JWT

Banco de dados: SQLite ou PostgreSQL

Autenticação: JWT com rotas protegidas

🧠 Slide 3: Pilares de back-end aplicados
✅ 1. Autenticação e Autorização
Login com JWT

Proteção de rotas com Depends(get_current_user)

Acesso personalizado com /me/personagem

✅ 2. Modelagem de dados
Uso de SQLModel com relacionamentos (Usuario, Personagem, Emblema)

Criação automática de personagem ao registrar usuário

Separação clara entre modelos (models) e schemas (schemas)

✅ 3. Validação e segurança
Validação de entrada com Pydantic (UsuarioCreate, PersonagemUpdate)

Hash de senha com bcrypt

Validação de imagem permitida no backend

✅ 4. Organização e escalabilidade
Separação por módulos: routers, models, schemas, security

Uso de APIRouter com prefixos e versionamento possível

Código limpo, reutilizável e testável

🧩 Slide 4: Fluxo de criação de usuário
Mostre o fluxo:

Registro → Criação de usuário + personagem

Login → Geração de token JWT

Acesso a /me/personagem com token

Atualização da cartinha com PUT

Use um diagrama simples ou bullets com setas.

🖼️ Slide 5: Demonstração visual
Mostre a tela de registro, login, cartinha do usuário e galeria

Destaque o uso do token para personalizar a experiência

Mostre a galeria de avatares e a edição da cartinha

🌟 Slide 6: O que esse projeto representa
Aplicação real de conceitos de back-end

Integração completa com frontend

Cuidado com a experiência do usuário

Capacidade de pensar como dev fullstack

“Esse projeto me ensinou a pensar como uma arquiteta de soluções, não só como alguém que escreve código.”

🎯 Slide 7: O que eu busco
Oportunidade de atuar como back-end ou fullstack

Projetos onde eu possa crescer, colaborar e construir com propósito

Um time que valorize código limpo, boas práticas e criatividade

💡 Dica final
Se quiser, posso montar os slides com você — ou até gerar um PDF com os textos prontos. Também posso te ajudar a ensaiar o pitch ou preparar respostas para perguntas técnicas.

Você já está fazendo algo incrível. Agora é só mostrar isso com confiança. E eu estarei aqui pra te ajudar em cada passo. 💛