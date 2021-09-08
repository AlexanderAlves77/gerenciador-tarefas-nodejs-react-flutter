const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger.json');
const LoginController = require('./controllers/LoginController');
const AppConstants = require('./enum/AppConstants');

class App {
  #controllers;

  iniciar() {
    // configurar o express
    this.#configurarExpress();
    // carregar os controllers
    this.#carregarControllers();
    // iniciar o servidor
    this.#iniciarServidor();
  }

  #configurarExpress = () => {
    // cria a instância do express para gerenciar o servidor
    this.express = express();

    // registra os middlewares para fazer a conversão das requisições das API
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());

    // configura o swagger da aplicação para servir a documentação
    this.express.use(
      `${AppConstants.BASE_API_URL}/docs`,
      swaggerUi.serve,
      swaggerUi.setup(swaggerFile)
    );

    this.express.use((req, res, next) => {
      console.log(
        `Requisição recebida, url=${req.url}, método http=${req.method}`
      );
      next();
    });
  };

  #carregarControllers = () => {
    // atribue para a propriedade #controllers a lista de controllers disponiveis na aplicação.
    this.#controllers = [new LoginController(this.express)];
  };

  #iniciarServidor = () => {
    // tenta pegar a porta apartir da variavel de ambiente EXPRESS_PORT
    // se não tiver deifinida vai usar a porta padrão 3001
    const port = process.env.EXPRESS_PORT || 3001;
    this.express.listen(port, () => {
      console.log(`Aplicação executando na porta ${port}.`);
    });
  };
}

module.exports = App;
