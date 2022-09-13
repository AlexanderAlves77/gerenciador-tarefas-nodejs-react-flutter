const mongoose = require('mongoose')

class MongoDBConnectionHelper {

    static conectar() {
        
        const conexao = mongoose.connect(process.env.MONGO_DB_STRING_CONEXAO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        mongoose.connection.on('connected', () => {
            console.log('Conectado ao MongoDB')
        })        

        mongoose.connection.on('error', (e) => { 
            console.error('Erro ao conectar ao MongoDB.', e.message)
        })

        return conexao
    }
}

module.exports = MongoDBConnectionHelper