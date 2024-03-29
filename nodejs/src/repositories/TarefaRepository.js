module.exports = (Implementacao) => {
    if (!Implementacao.cadastrar) {
        throw new Error(`A classe ${Implementacao} não implementou o método cadastrar.`)
    }

    if (!Implementacao.editar) {
        throw new Error(`A classe ${Implementacao} não implementou o método editar.`)
    }

    if (!Implementacao.deletar) {
        throw new Error(`A classe ${Implementacao} não implementou o método deletar.`)
    }

    if (!Implementacao.filtrarPorUsuarioPeridoEStatus) {
        throw new Error(`A classe ${Implementacao} não implementou o método filtrarPorUsuarioPeridoEStatus.`)
    }

    if (!Implementacao.buscarPorId) {
        throw new Error(`A classe ${Implementacao} não implementou o método buscarPorId.`)
    }

    return Implementacao
}
