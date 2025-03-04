# Chat API

```bash
npx create-react-app chat-app
cd chat-apps
```

Esta é a base do nosso projeto. O comando create-react-app configura um projeto React com todas as ferramentas necessárias para desenvolvimento.
Agora, vamos instalar algumas bibliotecas que nos ajudarão:

```bash
npm install react-router-dom axios styled-components
```

- ```react-router-dom```: Para gerenciar a navegação entre páginas
- ```axios```: Para fazer requisições HTTP às APIs
- ```styled-components```: Para estilizar nossos componentes de forma mais organizada

## Estrutura de organização do projeto:

- ```/components```: Componentes reutilizáveis (botões, inputs, etc.)
- ```/pages```: Páginas completas da aplicação (login, registro, chat)
- ```/services```: Funções para comunicação com APIs
- ```/contexts```: Contextos para gerenciamento de estado global
- ```/hooks```: Hooks personalizados
- ```/utils```: Funções utilitárias