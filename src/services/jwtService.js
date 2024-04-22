const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
const genderAccessToken = async (payload) => {
    //     return new Promise((resolve, reject) => {
    const access_Token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: "12s" })
    return access_Token
}
const genderRefreshToken = async (payload) => {
    // console.log('payload s',payload);
    //     return new Promise((resolve, reject) => {
    const refresh_Token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    // console.log('refresh_Token jwt',refresh_Token);
    return refresh_Token
}
const refreshTokenJwtService = (token) => {
    //  console.log('refreshTokenJwtService',token);
    return new Promise((resolve, reject) => {
        try {
            //    debugger
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                //    console.log('err user',user);
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'refreshTokenJwtService the autithencation'
                    })
                }

                // const { payload } = user

                const access_token = await genderAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                console.log('user access_token', access_token);
                resolve({
                    status: '0k',
                    message: 'SUCCESS',
                    access_token
                })

            })

        } catch (e) {
            reject(e)
        }
    })
    // const refresh_Token = jwt.sign({
    //     payload
    // },process.env.REFRESH_TOKEN,{expiresIn:'365d'})
    // return refresh_Token
}
module.exports = {
    genderAccessToken,
    genderRefreshToken,
    refreshTokenJwtService
}