const UserService = require('../services/UserService')
const JwtService = require('../services/jwtService')
const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log('e', e);
        return res.status(404).json({

            message: e
        })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }
        const response = await UserService.loginUser(req.body)
        const { refresh_token, ...newReponse } = response
        console.log('response', response);
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        })
        return res.status(200).json({ ...newReponse, refresh_token })
    } catch (e) {
        console.log('e', e);
        return res.status(404).json({

            message: e
        })
    }
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTkxOTk4YmUyZTVmOTEzNDY5YWMxMiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDQ2ODM3NDcsImV4cCI6MTczNjIxOTc0N30.CLo5mf-fWcKDpVepjH0jiLDn-_IVbuKf-6sba0_ABCY
}

const updateUser = async (req, res) => {

    try {
        // const { name, email, password, confirmPassword, phone } = req.body
        // const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        // const isCheckEmail = reg.test(email)
        // if (!email || !password || !confirmPassword) {
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'The input is required'
        //     })
        // } else if (!isCheckEmail) {
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'The input is email'
        //     })
        // } else if (password !== confirmPassword) {
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'The password is equal confirmPassword'
        //     })
        // }
        // console.log('req userId',req);
        const userId = req.params.id;
        console.log('userId', userId);
        const data = req.body;
        console.log('updateUser data', data);
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ERR NOT FOUND USER'
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        console.log('e', e);
        return res.status(404).json({

            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    console.log('here');
    try {

        const userId = (req.params.id)
        const token = req.headers;
        // console.log('token',token);
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        console.log('e', e);
        return res.status(404).json({

            message: e
        })
    }
}


const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {

        const userId = req.params.id;
        // console.log('getDetailsUser',userId);
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user not found'
            })
        }
        const respone = await UserService.getDetailsUser(userId)
        return res.status(200).json(respone)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const refreshToken = async (req, res) => {
    // console.log('refreshToken',req)
    try {

        // const token = req.headers.token.split(' ')[1]
        const token = req.cookies.refresh_token
        console.log('req token', token)
        //    console.log('req refreshToken token',req.cookies);
        // const userId = req.params.id;
        //  console.log('Token refresh in controller',token);
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const respone = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(respone)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const logoutUser = async (req, res) => {

    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout Successfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const deleteManyUser = async (req, res) => {
    console.log('do deleteManyUser');
    try {
        const ids = req.body.ids
        if (!ids) {

            return res.status(200).json({
                status: 'ERR',
                message: 'The ids required!'
            })
        }
        const response = await UserService.deleteManyUser(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: e
        })
    }
}
module.exports = {
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    deleteManyUser
}