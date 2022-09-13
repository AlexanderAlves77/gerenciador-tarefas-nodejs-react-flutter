const TarefaRepository = require('../repositories/impl/MongoDBTarefaRepository')

class TarefaService {

    constructor(idUsuario) {
        this.idUsuario = idUsuario
    }

    async listar(filtro = {}) {
        filtro.idUsuario = this.idUsuario
        return TarefaRepository.filtrarPorUsuarioPeridoEStatus(filtro)
    }

    async cadastrar(dados) {
        const erros = []

        if (!dados) {
            erros.push('Favor enviar os dados para cadastro da tarefa.')

        } else {
            if (!dados.nome || !dados.nome.trim()) {
                erros.push('Nome da tarefa é obrigatório')
            } else if (dados.nome.length < 4) {
                erros.push('Nome da tarefa precisa ter pelo menos 4 caracteres.')
            }

            if (!dados.dataPrevistaConclusao || !dados.dataPrevistaConclusao.trim()) {
                erros.push('Data prevista de conclusão é obrigatório')
            }
        }

        const respostas = { erros: null, tarefa: null }

        if (erros.length) {
            respostas.erros = erros 

        } else {
            const dataPrevistaConclusao = new Date(dados.dataPrevistaConclusao)
            const dataConclusao = dados.dataConclusao 
                ? new Date(dados.dataConclusao) : null

            const tarefa = { 
                nome: dados.nome, 
                dataPrevistaConclusao: dataPrevistaConclusao,
                dataConclusao: dataConclusao,
                idUsuario: this.idUsuario
            }

            respostas.tarefa = await TarefaRepository.cadastrar(tarefa)
        }

        return respostas
    }

    async editar(id, dados) {
        const erros = []

        if (!id ) {
            erros.push('ID da tarefa é obrigatório.')
        } else {
            const tarefaBD = await TarefaRepository.buscarPorId(id)

            if (!tarefaBD || tarefaBD.idUsuario !== this.idUsuario) {
                erros.push('Tarefa não foi encontrada.')
            }

            if (dados.nome && dados.nome.trim() && dados.nome.trim().length < 4) {
                erros.push('Nome da tarefa precisa ter pelo menos 4 caracteres.')
            }
        }

        if (erros.length) {
            return { erros }
        }

        const dadosAtualizar = {}

        if (dados.nome && dados.nome.trim()) {
            dadosAtualizar.nome = dados.nome
        }

        if (dados.dataPrevistaConclusao && dados.dataPrevistaConclusao.trim()) {
            dadosAtualizar.dataPrevistaConclusao = new Date(dados.dataPrevistaConclusao)
        }

        if (dados.dataConclusao && dados.dataConclusao.trim()) {
            dadosAtualizar.dataConclusao = new Date(dados.dataConclusao)
        }

        const tarefaEditada = await TarefaRepository.editar(id, dadosAtualizar)

        return tarefaEditada
    }    

    async deletar(id) {
        const erros = []

        if (!id ) {
            erros.push('ID da tarefa é obrigatório.')
        } else {
            const tarefaBD = await TarefaRepository.buscarPorId(id)

            if (!tarefaBD || tarefaBD.idUsuario !== this.idUsuario) {
                erros.push('Tarefa não foi encontrada.')
            }
        }

        const resposta = { erros: null }
        if (erros.length) {
            resposta.erros = erros
        } else {            
            await TarefaRepository.deletar(id)
        }

        return resposta
    }
}

module.exports = TarefaService 