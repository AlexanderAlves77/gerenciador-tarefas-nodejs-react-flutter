# APP Gerenciador de Tarefas

## Apresentação do Projeto
1. O projeto será totalmente fullstack, onde vai ser desenvolvido uma API que fornecerá os dados para a plataforma web, quanto para o aplicativo.mobile.
1. Todos os dados serão salvos em banco de dados.
1. A API terá todos os conceitos de segurança para que os dados não sejam acessíveis de forma pública: somente um usuário autenticado terá acesso a seus dados cadastrados na plataforma.
1. O site será uma plataforma web responsiva para que possa funcionar tanto no navegador do computador, quanto no celular do usuário.
1. O aplicativo mobile será feito na plataforma nativa, utilizando as melhores tecnologias do mercado.
1. A aplicação deverá ter uma aparência agradável, com boa usuabilidade e facilidade de navegação.
1. Foi desenvolvido um protótipo para seguir como base do layout, tanto para o site web, quanto para o aplicativo e navegador mobile.

## Api com NodeJS.
### Configuração do ambiente de desenvolvimento

1. Clonar o repositório
1. Executar o comando `npm i` para instalar as dependências
1. Fazer uma cópia do arquivo `.env-example` e chamar de `.env`
1. Atualizar as variaveis de ambiente no arquivo `.env` 
1. Executar o comando `npm start` para o rodar o servidor

## Projeto Backend
### Passos
1. Criar a API;
1. Adicionar o swagger;
1. Criar API de login com usuário e senha mockado;
1. Criar arquivos e configurações JWT e retornar no final do Controller;
1. Criar API de usuário;
1. Adicionar banco de dados na aplicação;
1. Concluir API de cadastro de usuário; 
1. Tirar Mock da API de login;
1. Criar API de tarefas;
	- Criar Post;
	- Criar Get com filtros;
	- Criar Put;
	- Criar Delete;
	
## Projeto Frontend
### Navegação - Login
1. Nenhuma funcionalidade do site deverá ser exibida sem que o usuário seja autenticado;
1. Nessa tela, o usuário deverá informar um login e senha salvos no banco de dados para ter acesso ao sistema;
1. Caso os dados informados sejam válidos, direcionar o usuário para a home do gerenciador;
1. Caso os dados sejam inválidos, exibir a mensagem adequada para o usuário;

### Passos
1. Criar projeto React;
1. Criar componente de Login;
1. Criar componente da home;
1. Integrar listagem e filtros com API de busca de tarefas; 
1. Criar modal de adicionar tarefa;
1. Integrar modal de adicionar com a API de adicionar;
1. Criar modal de edição e deleção de tarefa;
1. Integrar modal com as APIs de edição e deleção;

### Navegação - Filtrar Tarefas 
1. Quando o usuário tiver tarefas cadastradas, elas serão listadas na totalidade, separadas por ativas e concluídas;
1. Para facilitar a gestão, o usuário pode pesquisar por período de data e status, e o sistema deverá exibir somente atividades no filtro selecionado;
1. Cada tarefa cadastrada exibirá uma linha com os seguintes dados:
	- Nome da tarega;
	- Data prevista de conclusão;
	- Caso a tarefa esteja em aberto, será exibido um botão para que o usuário possa concluí-la e informar a data real de conclusão;
	- Caso a tarefa esteja concluída, será exibida a data de conclusão além da prevista;

### Navegação - Criar Tarefas
1. O usuário poderá, a qualquer momento, criar uma tarefa ao clicar no botão "Adicionar uma tarefa";
1. Será exibido um modal com os seguintes dados:
	- Nome da tarefa;
	- Data de previsão de conclusão;
1. Ao informar os campos, o sistema fará a validação e, caso esteja tudo correto, fazer a inserção no banco de dados;
1. Caso algum dados esteja inválido, informar para o usuário para que ele possa ajustar a informação;





