const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const authMiddleWare = (req, res, next) => {


    // const token = req.headers?.token?.split(' ')[1]
    const token = req.headers.token.split(' ')[1]
    console.log('log token', token);
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        console.log('authMiddleWareuserauthMiddleWareuser', user);

        if (err) {
            return res.status(404).json({
                message: 'the authentication wrong',
                status: 'ERR'
            })
        }
        const { payload } = user
        console.log('payload', payload) // bar
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'the authentication not isAdmin',
                status: 'ERR'
            })
        }
    });
}
// user thường chỉ xem dc user đó, còn admin thì xem dc tất cả
const authUserMiddleWare = (req, res, next) => {
    // console.log('log authUserMiddleWare',req.headers,req.body.token || req.query.token || req.headers[ "x-access-token" ]);
    // const token = req.headers?.token?.split(' ')[1]
    const token = req.headers?.token.split(' ')[1]
    if (token === undefined) {
        console.log('do đây nha');
        return token = req.headers?.refresh_token
    }
    console.log('getTokenauthUserMiddleWare', req.headers?.token, req.headers);
    console.log('authUserMiddleWare test', token);
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        console.log('v user', user);
        if (err) {
            console.log('err', err);
            return res.status(404).json({
                message: 'ERR the authentication wrong',
                status: 'ERR'
            })
        }
        const { payload } = user

        if (user?.isAdmin || user?.id === userId) {
            console.log("authUserMiddleWare do");
            next()
        } else {
            return res.status(404).json({
                message: 'the authentication not isAdmin',
                status: 'ERR'
            })
        }
    });
}
module.exports = {
    authMiddleWare,
    authUserMiddleWare
}