# auth_graphql

API GraphQL simples de autenticação (JWT) usando TypeScript, Apollo Server e TypeORM.

## Descrição

Projeto de exemplo que implementa fluxo de autenticação com access token e refresh token.

## Requisitos

- Node.js (>=18 recomendado)
- npm ou yarn
- Docker & Docker Compose (opcional, para o banco de dados)

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz com as variáveis abaixo (exemplo):

```
NODE_ENV=development
DB_HOST=localhost
DB_USER=mydbuser
DB_PASS=mydbpass
DB_NAME=mydbname
JWT_ACCESS_SECRET=algumsegredodeacesso
JWT_REFRESH_SECRET=algumsegredoderefresh
```

Quando usar o `docker-compose.yml` incluído, as variáveis `DB_USER`, `DB_PASS` e `DB_NAME` serão usadas pelo serviço Postgres.

## Instalação

1. Instale dependências:

```bash
npm install
# ou
yarn
```

2. (Opcional) Subir o Postgres com Docker Compose:

```bash
docker-compose up -d
```

3. Rodar em modo de desenvolvimento (watch):

```bash
npm run dev
```

4. Para build e execução em produção:

```bash
npm run build
npm start
```

O servidor inicializa na porta 4000 (endpoint GraphQL):

```
http://localhost:4000/
```

## Como testar (GraphQL)

Use o Apollo Studio / GraphQL Playground ou `curl` para executar mutações. Exemplos:

- Registrar novo usuário:

```graphql
mutation {
  register(email: "user@example.com", password: "secret") {
    accessToken
    refreshToken
  }
}
```

- Fazer login:

```graphql
mutation {
  login(email: "user@example.com", password: "secret") {
    accessToken
    refreshToken
  }
}
```

- Trocar refresh token por novos tokens:

```graphql
mutation {
  refreshToken(token: "SEU_REFRESH_TOKEN_AQUI") {
    accessToken
    refreshToken
  }
}
```

Observações:
- Cada `refreshToken` é armazenado no banco. Ao usar um refresh token válido, ele é marcado como `revoked` e um novo par de tokens é retornado.

## Estrutura relevante

- Código-fonte: `src/`
- Ponto de entrada: `src/server.ts`
- Variáveis de ambiente: `src/config/env.ts`

## Testes manuais rápidos

1. Garanta que o Postgres esteja disponível (via Docker ou local).
2. Preencha `.env` com as credenciais do banco e secrets JWT.
3. Rode `npm run dev`.
4. Abra `http://localhost:4000` e execute as mutações de exemplo.

## Licença

Este projeto é licenciado sob a Licença MIT.

---

Mikael Aurio Martins
