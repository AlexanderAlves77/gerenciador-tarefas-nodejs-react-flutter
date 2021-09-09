const jwt = require('jsonwebtoken');

class LoginService {
  logar(login, senha) {
    // TODO: verificar se o usuário está cadastrado no banco de dados
    const usuario = {
      id: 1,
      nome: 'Usuário Teste',
      email: 'email@email.com',
    };

    // Gera o token de acesso usando o JWT
    const token = jwt.sign({ _id: usuario.id }, process.env.CHAVE_SECRETA_JWT);

    // Devolve as informações do usuário autenticado com o seu token de acesso
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token: token,
    };
  }
}

module.exports = LoginService;
