const { verifyJwt } = require('../helpers/jwt')

const checkJwt = (request, response, next) => {
    let token = request.headers['authorization'];
    token = token ? token.slice(7,token.length) : null;
    //para eliminar o 'Bearer ' da string de token

    if(!token) {
        return response.jsonUnauthorized(null, 'Invalid token');
    }

    try {
        const decoded = verifyJwt(token);
        request.accountId = decoded.id;
        console.log('Decoded token', decoded);
        //console.log('Decoded token expiration date', new Date(decoded.exp * 1000));
        next();
    } catch (err) {
        return response.jsonUnauthorized(null, 'Invalid token');
    }
}

module.exports = checkJwt;