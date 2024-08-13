## Sistema Gerencial de Pedidos Terra e Sol
Este é um projeto backend para um sistema gerencial de pedidos, onde é possível adicionar, excluir, editar e consultar pedidos com base em diversos critérios, como ID ou nome.

## Pré-requisitos
Para rodar este projeto localmente, você precisará ter as seguintes ferramentas instaladas:

Node.js e npm (Node Package Manager) - Download Node.js
XAMPP - para MySQL e Apache - Download XAMPP
Alternativamente: Você pode usar qualquer outro banco de dados compatível, mas será necessário atualizar as configurações no arquivo Environment.ts.

## Configuração do Ambiente

Clone o repositório:
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

Instale as dependências do projeto:
npm install

## Configuração do Banco de Dados:

Inicie o XAMPP e certifique-se de que o MySQL e o Apache estejam rodando.
Crie um banco de dados no MySQL onde as tabelas serão armazenadas.
Atualize as Configurações do Banco de Dados:

Navegue até o arquivo Environment.ts dentro da pasta src/server/database/knex.
Atualize as informações de conexão com o banco de dados (host, user, password, database, etc.).

// Environment.ts - exemplo de configuração
export const environment = {
  database: {
    host: 'localhost',
    user: 'seu-usuario',
    password: 'sua-senha',
    database: 'seu-banco-de-dados',
    // outras configurações...
  }
};

## Executando a Aplicação
Certifique-se de que o banco de dados está rodando:

No XAMPP, inicie o MySQL.
Crie a tabela necessária no banco de dados:

Antes de executar as migrações, crie a tabela inicial

Rode as migrações para criar os campos da tabela:
npm run knex:migrate

Inicie a aplicação:
npm run start NA API
npm run dev no frontend caso rode local
A aplicação estará rodando em http://localhost:3000.

## Funcionalidades
Adicionar Pedido: Crie novos pedidos com dados personalizados.
Excluir Pedido: Remova pedidos do sistema.
Editar Pedido: Atualize informações de pedidos existentes.
Consultar Pedidos:
Buscar pedidos por ID.
Buscar pedidos por nome.
Consultar um pedido específico pelo seu ID.

## Estrutura do Projeto
.
├── src
│   ├── server
│   │   ├── database
│   │   │   ├── knex
│   │   │   │   └── Environment.ts
│   │   ├── controllers
│   │   ├── models
│   │   └── routes
│   └── index.ts
└── package.json

## Tecnologias Utilizadas
Node.js
Express.js
MySQL
Knex.js (Query Builder)
yup (Validação)
TypeScript (opcional, dependendo do seu setup)

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues para melhorias e correções.

## Licença
Este projeto está licenciado sob a Licença MIT.

## English
## Terra e Sol Order Management System
This is a backend project for an order management system, where it is possible to add, delete, edit and consult orders based on different criteria, such as ID or name.

## Prerequisites
To run this project locally, you will need to have the following tools installed:

Node.js and npm (Node Package Manager) - Download Node.js
XAMPP - for MySQL and Apache - Download XAMPP
Alternatively: You can use any other supported database, but you will need to update the settings in the Environment.ts file.

## Environment Setting

Clone the repository:
git clone https://github.com/seu-usuario/seu-repositorio.git
cd your-repository

Install project dependencies:
npm install

## Database Configuration:

Start XAMPP and make sure MySQL and Apache are running.
Create a database in MySQL where the tables will be stored.
Update Database Settings:

Navigate to the Environment.ts file inside the src/server/database/knex folder.
Update the database connection information (host, user, password, database, etc.).

// Environment.ts - configuration example
export const environment = {
  data base: {
    host: 'localhost',
    user: 'your-user',
    password: 'your-password',
    database: 'your-database',
    // other settings...
  }
};

## Running the Application
Make sure the database is running:

In XAMPP, start MySQL.
Create the required table in the database:

Before running migrations, create the initial table

Run the migrations to create the table fields:
npm run knex:migrate

Start the application:
npm run start in backend
npm run dev in frontend
The application will be running at http://localhost:3000.

## Functionalities
Add Order: Create new orders with custom data.
Delete Order: Remove orders from the system.
Edit Order: Update existing order information.
Consult Orders:
Search orders by ID.
Search orders by name.
Consult a specific order by its ID.

## Project Structure
.
├── src
│ ├── server
│ │ ├── database
│ │ │ ├── knex
│ │ │ │ └── Environment.ts
│ │ ├── controllers
│ │ ├── models
│ │ └── routes
│ └── index.ts
└── package.json

## Technologies Used
Node.js
Express.js
MySQL
Knex.js (Query Builder)
yup (Validation)
TypeScript (optional, depending on your setup)

## Contributions
Contributions are welcome! Feel free to send pull requests or open issues for improvements and corrections.

## License
This project is licensed under the MIT License.
