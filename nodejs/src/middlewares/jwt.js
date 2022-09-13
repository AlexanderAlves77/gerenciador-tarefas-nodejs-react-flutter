const jwt = require('jsonwebtoken')
const UsuarioRepository = require('../repositories/impl/MongoDBUsuarioRepository')

const rotasPublicas = [
    { url: '/api/login', metodo: 'POST' },
    { url: '/api/docs*', metodo: 'GET' },
    { url: '/api/usuario', metodo: 'POST' }
]

module.exports = (req, res, next) => {
    req.logger.info('Verificando permissão de acesso a rota', `rota=${req.url}`)    

    const rotaPublica = rotasPublicas.find(rota => {
        const rotaWidcard = rota.url.indexOf('*') !== -1
        const urlContemRotaPublica = req.url.indexOf(rota.url.replace('*', '')) !== -1

        return ( rota.url === req.url || (rotaWidcard && urlContemRotaPublica ) )
        && (rota.metodo === req.method.toUpperCase())
    })

    if(rotaPublica || req.method.toUpperCase() === 'OPTIONS') {
        req.logger.info('rota pública, requisição liberada.')
        return next()
    }

    const authorization = req.headers.authorization

    if(!authorization) {
        req.logger.info('acesso negado, sem header de autorização.')

        return res.status(401).json({ 
            status: 401, 
            erro: 'acesso negado, você precisa enviar o header authorization.' 
        })
    }

    const token = authorization.substr(7)

    if(!token) {
        req.logger.info('requisição sem token de acesso.')

        return res.status(401).json({
            status: 401,
            erro: 'acesso negado, o token de acesso não foi informado.'
        })
    } 

    jwt.verify(token, process.env.CHAVE_SECRETA_JWT, async (err, decoded) => {
        if(err) {
            req.logger.error('Erro ao decodificar o token jwt', `token=${token}`)

            return res.status(401).json({
                status: 401,
                erro: 'acesso negado, problema ao decodificar o seu token de autorização.'
            })
        } 

        req.logger.debug('token jwt decodificado', `idUsuario=${decoded._id}`)

        const usuario = await UsuarioRepository.buscarPorId(decoded._id)

        if (!usuario) {
            req.logger.error('usuário não encontrado na base', `id=${decoded._id}`)

            return res.status(401).json({
                status: 401,
                erro: 'acesso negado, usuário não encontrado.'
            })
        }

        req.usuario = usuario
        next()
    })    
}