const jwt = require('jsonwebtoken');

// define a lista d rotas publicas da aplicação
const rotasPublicas = [
  {
    url: '/api/login',
    metodo: 'POST',
  },
  {
    url: '/api/docs/*',
    metodo: 'GET',
  },
  {
    url: '/api/usuario',
    metodo: 'POST',
  },
];

module.exports = (req, res, next) => {
  req.logger.info('verificando permissão de acesso à rota', `rota=${req.url}`);

  // verifica se a requisição recebida é de alguma rota pública
  const rotaPublica = rotasPublicas.find(rota => {
    const rotaPublicaContemWidcard = rota.url.indexOf('*') !== -1;
    const urlRequisicaoContemParteDaRotaPublica =
      req.url.indexOf(rota.url.replace('*', '')) !== -1;

    return (
      // verifica se a rota da requisição é identica
      (rota.url === req.url ||
        // ou a rota pública contém um '*' e a rota da requisição possui como parte da url a rota públia
        (rotaPublicaContemWidcard && urlRequisicaoContemParteDaRotaPublica)) &&
      rota.metodo === req.method.toUpperCase()
    );
  });

  if (rotaPublica) {
    req.logger.info('Rota pública, requisição liberada');
    return next();
  }

  const authorization = req.headers.authorization;
  // verifica se o header de authorização foi informado
  if (!authorization) {
    req.logger.info('Acesso negado, sem header de autorização');
    // http status 401 = acesso negado
    return res.status(401).json({
      status: 401,
      erro: 'Acesso negado, você precisa enviar o header authorization',
    });
  }

  // aqui pega o token de autorização extraindo a parte do 'Bearer '
  // pega o texto do 8 caractere em diante
  const token = authorization.substr(7);
  if (!token) {
    req.logger.info('Acesso negado, sem token de acesso');

    return res.status(401).json({
      status: 401,
      erro: 'Acesso negado, o token de acesso não foi informado',
    });
  }

  // verificar se o token é valido e foi gerado usando a nossa chave secreta
  jwt.verify(token, process.env.CHAVE_SECRETA_JWT, (err, decoded) => {
    if (err) {
      req.logger.error('Erro ao codificar o token jwt', `token=${token}`);

      return res.status(401).json({
        status: 401,
        erro: 'Acesso negado, problema ao codificar o seu token de authorização',
      });
    }

    req.logger.debug('Token jwt decodificado', `idUsuario=${decoded._id}`);
    // TODO: carregar o usuário apartir do banco de dados
    const usuario = {
      id: decoded._id,
    };

    // atribui a propriedade usuario da requisição, quem é o usuario autenticado
    req.usuario = usuario;
  });

  next();
};
