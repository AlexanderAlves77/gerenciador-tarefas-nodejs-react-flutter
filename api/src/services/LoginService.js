const jwt = require('jsonwebtoken');
const md5 = require('md5');
const UsuarioRepository = require('../repositories/impl/MongoDBUsuarioRepository');

class LoginService {
  logar(login, senha) {
    const filtro = {
      email: login,
      senha: md5(senha),
    };

    let usuario = null;
    const usuarios = await UsuarioRepository.filtrar(filtro);

    if (usuarios && usuarios.length) {
      usuario = {
        id: usuarios[0]._doc._id,
        nome: usuarios[0]._doc.nome,
        email: usuarios[0]._doc.email,
      };
    } else {
      return null;
    }

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
