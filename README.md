# My Book List Front

Este projeto é a interface frontend de uma aplicação para gerenciar uma lista de livros. Ele permite visualizar, adicionar e interagir com os dados de livros de forma simples e intuitiva.

## O que o projeto faz
- Exibe uma lista de livros na página
- Permite adicionar novos livros
- Consome dados de uma API backend
- Organiza a interface com HTML, CSS e JavaScript

## Tecnologias utilizadas
- HTML
- CSS
- JavaScript
- API REST
- Bootstrap

## Como executar
1. Abra a pasta do projeto no seu editor de código.
2. Inicie um servidor local, por exemplo com a extensão Live Server do VS Code.
3. Acesse o arquivo index.html no navegador.

## Estrutura do projeto
- `index.html`: estrutura principal da página
- `css/style.css`: estilos da interface
- `js/api.js`: funções de comunicação com a API backend
- `js/livros.js`: lógica de carregamento, criação, edição e remoção de livros / trechos
- `js/ui.js`: renderização de cards, trechos e controle de interface
- `js/status.js`: estado do filtro de status atual
- `js/utils.js`: utilitários de formatação
- `js/main.js`: ponto de entrada que importa os módulos

## Observações
- A aplicação consome uma API REST no `http://127.0.0.1:8000`.
- O navegador deve carregar `index.html` a partir de um servidor local para que os módulos ES funcionem.
- Se a API não estiver no mesmo host/porta, atualize `API_URL` em `js/api.js`.
