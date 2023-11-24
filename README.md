# Projeto BrisaCORP Backend

Este é um projeto incrível que utiliza MongoDB como banco de dados. Aqui estão os passos para configurar e executar o projeto em sua máquina local.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina antes de começar:

- [Node.js](https://nodejs.org/en/download/current) - Versão utilizada: v18.12.1
- [Docker](https://www.docker.com/products/docker-desktop/)
- [MongoDB](https://www.mongodb.com/try/download/shell)

## Configuração do Ambiente

1. Clone o repositório:

    ```bash
    git clone git@github.com:mgsMatheus/frontend-brisacorp.git
    ```

2. Instale as dependências do projeto:

    ```bash
    npm install
    ```

3. Inicie o servidor MongoDB. Você pode escolher entre rodar o MongoDB localmente ou via Docker.

    - Para rodar localmente:

        ```bash
        docker run --name mongodb-container -p 27017:27017 -d mongo
        ```

    - Ou utilize o Docker Compose na raiz do projeto:

        ```bash
        docker-compose up -d
        ```

## Executando o Projeto

1. Após a configuração do MongoDB, execute o seguinte comando para iniciar o servidor:

    ```bash
    npm run start
    ```

2. Acesse o Swagger e as APIs em:

    [http://localhost:3000/v1/docs](http://localhost:3000/v1/docs)

## Acessando o Banco de Dados

1. Abra o MongoDB Shell ou um cliente MongoDB de sua escolha.

2. Conecte-se à URI:

    ```bash
    mongodb://localhost:27017
    ```

3. Acesse o banco de dados:

    ```bash
    use brisacorp
    ```

4. Explore e gerencie seus dados no banco de dados "brisacorp".

