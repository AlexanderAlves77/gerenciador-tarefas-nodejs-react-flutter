// faz a definição da interface do repositorio de usuarios
// então qualquer implementação de repositorio de usuario vai precisar ter os métodos definidos aqui
module.exports = Implementacao => {
  if (!Implementacao.cadastrar) {
    throw new Error(
      `A classe ${Implementacao} não implementou o método cadastrar!`
    );
  }

  if (!Implementacao.filter) {
    throw new Error(
      `A classe ${Implementacao} não implementou o método filtrar!`
    );
  }

  return Implementacao;
};
