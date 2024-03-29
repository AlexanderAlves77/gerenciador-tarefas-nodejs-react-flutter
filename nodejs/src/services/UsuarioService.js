const UsuarioRepository = require('../repositories/impl/MongoDBUsuarioRepository')

class UsuarioService {

    async cadastrar(dadosUsuario) {
        const listaErros = []

        if (!dadosUsuario.nome || !dadosUsuario.nome.toString().trim()) {
            listaErros.push('Nome do usuário inválido.')
        } else {
            const nomeParseado = parseInt(dadosUsuario.nome)
            const eUmNumero = !Number.isNaN(nomeParseado)

            if (!eUmNumero) {
                listaErros.push('Nome do usuário inválido.')
            }
        }

        if (!dadosUsuario.email || !dadosUsuario.email.toString().trim()) {
            listaErros.push('Email do usuário inválido.')
        } else {
            const temArroba = dadosUsuario.email.indexOf('@') !== -1 
            const temPonto = dadosUsuario.email.indexOf('.') !== -1

            if (!temArroba || !temPonto) {
                listaErros.push('E-mail do usuário inválido.')
            } else {
                const usuarioMesmoEmail = await UsuarioRepository.filtrar({
                    email: dadosUsuario.email
                })

                if (usuarioMesmoEmail && usuarioMesmoEmail.length) {
                    listaErros.push('Já existe um usuário com o mesmo email cadastrado')
                }
            }
        }

        if (!dadosUsuario.senha || !dadosUsuario.senha.trim()) {
            listaErros.push('Senha inválida.')
        }

        const retorno = { erros: null, usuario: null }

        if (listaErros.length) {
            retorno.erros = listaErros
        } else {
            const usuarioCadastrado = await UsuarioRepository.cadastrar({
                nome: dadosUsuario.nome,
                email: dadosUsuario.email,
                senha: dadosUsuario.senha
            })

            retorno.usuario = usuarioCadastrado
        }

        return retorno
    }

}

module.exports = UsuarioService