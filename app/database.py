# gerencia a conexão com o banco de dados
# Esse arquivo vai cuidar da criação do banco de dados e da sessão de acesso:
from sqlmodel import SQLModel, create_engine, Session

"""
SQLModel: base para criar os modelos (as tabelas).
create_engine: função que cria a conexão com o banco de dados.
Session: mecanismo para interagir com o banco (inserir, buscar, etc).
"""

DATABASE_URL = "sqlite:///./herois.db" #Define o caminho do arquivo .db com os dados salvos.
"""
"sqlite:///" é o prefixo padrão para usar SQLite.
"./herois.db" diz que o banco ficará na raiz do projeto.
"""

engine = create_engine(DATABASE_URL, echo=True)
"""
Cria o "motor" de conexão com o banco.
O echo=True mostra no terminal os comandos SQL executados — ótimo pra aprendizado e debug 
"""

def criar_banco(): #Essa função cria as tabelas no banco baseadas nos modelos que você definir.
    SQLModel.metadata.create_all(engine) #metadata.create_all() verifica se as tabelas existem e cria se não existir.

def get_session():
    with Session(engine) as session:
        yield session #retorna uma sessão do banco de dados
"""
Essa função é um gerador de sessão.
Sempre que precisarmos interagir com o banco (ex: listar personagens), vamos “pegar uma sessão” com ela
"""
