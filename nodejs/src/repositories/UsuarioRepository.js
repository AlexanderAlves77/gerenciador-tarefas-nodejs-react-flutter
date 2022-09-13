module.exports = (Implementacao) => {
    if (!Implementacao.cadastrar) {
        throw new Error(`A classe ${Implementacao} não implementou o método cadastrar.`)
    }

    if (!Implementacao.filtrar) {
        throw new Error(`A classe ${Implementacao} não implementou o método filtrar.`)
    }

    if (!Implementacao.buscarId) {
        throw new Error(`A classe ${Implementacao} não implementou o método buscar por id.`)
    }

    return Implementacao
}
