# Community Library

Este é um projeto de Integração e modelagem de dados de um produto digital

## Instalação

### Pré-requisitos

- Node.js (v14.x ou superior)
- npm (Node Package Manager) ou yarn

### Passos para instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Ali-Dionisio/RID_195219-Desafios.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd produtoDigital
   ```

3. Instale as dependências:

   Com npm:

   ```bash
   npm install
   ```

   Com yarn:

   ```bash
   yarn install
   ```
4. Inicie o servidor:

   Com npm:

   ```bash
   npm start
   ```

   Com yarn:

   ```bash
   yarn start
   ```

5. O servidor estará em execução em `http://localhost:3000`.

## Rotas

- **/clientes**: Rotas para operações de usuários (criar, listar,buscar por ID, atualizar, excluir).
- **/produtos**: Rotas para operações de produtos (criar, listar, buscar por ID, atualizar, excluir).
- **/pedido**: Rotas para operações de pedido (criar, listar, buscar por ID, excluir).
- **/estoque**: Rotas para operações de estoque (criar, listar, buscar por ID, excluir).
- **/venda**: Rotas para operações de venda (criar, listar, buscar por ID, excluir).

## Tecnologias Utilizadas

- Node.js
- Express.js
- SQLite (ou outro banco de dados de sua escolha)
- JSON Web Tokens (JWT) para autenticação
- Zod para validação de esquemas de dados


## Contribuição

Se você gostou do projeto e deseja contribuir, fique à vontade para abrir uma issue ou enviar um pull request. Todas as contribuições são bem-vindas!

Obrigado por acessar o projeto e por considerar contribuir para torná-lo ainda melhor!