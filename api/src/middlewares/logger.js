module.exports = (req, res, next) => {
  // gera  um número aleatório para a requisição e arredonda para devolver um número inteiro
  const traceId = Math.ceil(Math.random() * 99999999999999);

  const logger = {
    // exibi mensagens de erro
    error: (message, ...parametrosExtras) => {
      console.error(
        `[ERROR] traceId=${traceId}, msg=${message},`,
        ...parametrosExtras
      );
    },
    // exibi mensagens de depuração
    debug: (message, ...parametrosExtras) => {
      console.log(
        `[DEBUG] traceId=${traceId}, msg=${message},`,
        ...parametrosExtras
      );
    },
    // exibi mensagens informativas
    info: (message, ...parametrosExtras) => {
      console.info(
        `[INFO] traceId=${traceId}, msg=${message},`,
        ...parametrosExtras
      );
    },
  };

  logger.info(
    `Requisição recebida`,
    `url=${req.url}`,
    `método http=${req.method}`
  );

  //cria uma propriedade logger no objeto da requisiçao e atribui o objeto logger que criamos acima
  req.logger = logger;
  next();
};
