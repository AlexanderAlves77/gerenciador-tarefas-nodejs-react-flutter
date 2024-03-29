const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const TarefaSchema = new Schema({
    nome: { type: String, required: true }, 
    idUsuario: { type: String, required: true },
    dataPrevistaConclusao: { type: Date, required: true },
    dataConclusao: { type: Date, required: false }
})

const Tarefa = mongoose.model('tarefas', TarefaSchema)

module.exports = Tarefa