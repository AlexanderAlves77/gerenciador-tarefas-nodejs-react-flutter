const HttpController = require('./HttpController');
const LoginService = require('../services/LoginService');

class LoginController extends HttpController {
  // sobrescreve o método da classe HttpController
  configurarRotas(baseUrl) {
    // define a rota e o manipulador da classe login
    // passando o método login como referência e informando que o
    // contexto que deve ser usado é da própria objeto da classe LoginController
    this.express.post(`${baseUrl}/login`, this.login.bind(this));
  }

  async login(req, res) {
    try {
      // atribui o corpo da solicitação para a variavel body
      const body = req.body;

      // valida se foi passado no body os campos de login e senha
      if (!body || !body.login || !body.senha) {
        req.logger.info('requisição de login inválida');
        // retorna um erro para quem chamou a api falando que os parâmetros estão inválidos
        return res.status(400).json({
          status: 400,
          erro: 'Parâmetros de entrada inválidos',
        });
      }

      const service = new LoginService();
      const resultado = service.logar(body.login, body.senha);

      if (!resultado) {
        return res.status(400).json({
          erro: 'Login ou senha inválidos',
          status: 400,
        });
      }

      req.logger.info(
        'requisição de login realizada com sucesso',
        `resultado=${JSON.stringify(resultado)}`
      );

      // devolve a resposta mockada do login em formato json
      res.json(resultado);
      //
    } catch (e) {
      req.logger.error('erro ao realizar login, error=' + e.message);
      res.status(500).json({
        erro: 'Problema ao realizar login, tente novamente mais tarde.',
        status: 500,
      });
    }
  }
}

module.exports = LoginController;
