const HttpController = require("./HttpController")
const UsuarioService = require('../services/UsuarioService')

class UsuarioController extends HttpController {

    configurarRotas(baseUrl) {
        this.express.post(`${baseUrl}/usuario`, this.cadastrar.bind(this))
    }

    async cadastrar(req, res) {
        const dadosUsuario = req.body 

        try {   
            const servico = new UsuarioService()
            const retornoServico = await servico.cadastrar(dadosUsuario)

            if (retornoServico.erros) {
                return res.status(400).json({
                    status: 400,
                    erro: retornoServico.erros.join(', ')
                })
            }
            
            req.logger.info('Usuário cadastrado com sucesso.')

            res.json({
                msg: 'Usuário criado com sucesso.'
            })

        } catch (error) {
            req.logger.error(`erro ao cadastrar ao usuário, error=${error.message}`)
            
            res.status(500).json({
                status: 500,
                error: 'Ocorreu um problema ao cadastrar o usuário, tente novamente mais tarde.',
            })
        }
        
    }
}

module.exports = UsuarioController