const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const md5 = require('md5')

const msgErro = '*Campo obrigatório!'

const UsuarioSchema = new Schema({
    nome: { type: String, required: [ true, msgErro ] }, 
    email: { type: String, required: [ true, msgErro ] },
    senha: { type: String, required: [ true, msgErro ] }
})

UsuarioSchema.pre('save', function(next) {
    this.senha = md5(this.senha)
    next()
})

const Usuario = mongoose.model('usuarios', UsuarioSchema)

module.exports = Usuario