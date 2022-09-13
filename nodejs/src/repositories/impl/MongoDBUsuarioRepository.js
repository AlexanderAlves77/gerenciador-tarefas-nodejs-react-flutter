const UsuarioRepository = require('../UsuarioRepository')
const Usuario = require('../../models/Usuario')

const transformaUsuario = (usuarioBD) => {
    return {
        id: usuarioBD._doc._id.toString(),
        nome: usuarioBD._doc.nome,
        email: usuarioBD._doc.email
    }
}

class MongoDBUsuarioRepository {

    static cadastrar(dadosUsuario) {
        return Usuario.create(dadosUsuario)
    }

    static async filtrar(filtro = {}) {
        let usuarios = await Usuario.find(filtro)

        if(usuarios) {
            usuarios = usuarios.map(u => transformaUsuario(u))
        }

        return usuarios
    }

    static async buscarId(idUsuario) {
        const usuarioBD = await Usuario.findById(idUsuario) 

        if (usuarioBD) {
            return transformaUsuario(usuarioBD)
        }

        return null
    }
}

module.exports = UsuarioRepository(MongoDBUsuarioRepository)