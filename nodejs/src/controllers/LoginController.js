const HttpController = require("./HttpController")
const LoginService = require('../services/LoginService')

class LoginController extends HttpController {

    configurarRotas(baseUrl) {
        this.express.post(`${baseUrl}/login`, this.login.bind(this))
    }

    async login(req, res) {
        try {
            const body = req.body

            if (!body || !body.login || !body.senha) {
                req.logger.info('Requisição de login inválida.')

                return res.status(400).json({
                    status: 400,
                    erro: "Parâmetros de entrada inválidos"
                })
            }

            const service = new LoginService()
            const resultado = await service.logar(body.login, body.senha)

            if (!resultado) {
                return res.status(400).json({
                    status: 400,
                    erro: 'Login ou senha inválidos.'
                })
            }

            req.logger.info('Requisição de login realizada com sucesso.',
                `resultado=${JSON.stringify(resultado)}`)

            res.json(resultado)

        } catch (error) {
            req.logger.error(`erro ao realizar login, error=${error.message}`)
            
            res.status(500).json({
                status: 500,
                erro: 'Problema ao realizar login, tente novamente mais tarde.'
            })
        }

    }
}

module.exports = LoginController