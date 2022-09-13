const express = require("express")
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger.json')

const LoginController = require("./controllers/LoginController")
const UsuarioController = require("./controllers/UsuarioController")
const TarefaController = require("./controllers/TarefaController")
const MongoDBConnectionHelper = require('./helpers/MongoDBConnectionHelper')

const cors = require('./middlewares/cors')
const AppConstants = require("./enum/AppConstants")
const logger = require('./middlewares/logger')
const jwt = require('./middlewares/jwt')

class App {
    #controllers

    iniciar() {
        this.#configurarExpress()
        this.#configurarBancoDeDados()
        this.#carregarControllers()
        this.#iniciarServidor()
    }

    #configurarExpress = () => {
        this.express = express()

        this.express.use(logger)

        this.express.use(express.urlencoded({ extended: true }))
        this.express.use(express.json())

        this.express.use(cors)
        this.express.use(jwt)

        this.express.use(`${AppConstants.BASE_API_URL}/docs`, 
            swaggerUi.serve, 
            swaggerUi.setup(swaggerFile)
        )        
    }

    #configurarBancoDeDados = () => {
        MongoDBConnectionHelper.conectar()
    }
    
    #carregarControllers = () => {
        this.#controllers = [
            new LoginController(this.express),  
            new UsuarioController(this.express),     
            new TarefaController(this.express)      
        ]
    }

    #iniciarServidor = () => {
        const port = process.env.EXPRESS_PORT || 3001
        this.express.listen(port, () => {
            console.log(`Servidor Rodando na porta ${port}.`)
        })
    }
}

module.exports = App