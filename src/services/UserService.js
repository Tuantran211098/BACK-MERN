const User = require("../models/UserModel")
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt")
const { genderAccessToken, genderRefreshToken } = require("./jwtService");
const { default: mongoose } = require("mongoose");
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {


            //check email in DB

            const checkUser = await User.findOne({
                email: email
            })
            // if (checkUser ) {
            //     resolve({
            //         status: 'ERR',
            //         message: 'The email is already'
            //     })
            // }
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }


            //  if(checkUser !== null){
            //     resolve({
            //        status:'OK',
            //        message:'The email is already'
            //      })
            //  }


            // Tạo user in DB
            const hashPass = bcrypt.hashSync(password.toString(), 10)
            //  console.log('hash',hashPass);
            const createdUser = await User.create({
                name,
                email,
                password: hashPass,
                // confirmPassword: hashPass,
                phone
            })
            console.log('createdUser', createdUser);

            if (createdUser) {
                console.log('createdUser', createdUser);
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = userLogin
        try {
            //check email in DB

            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user not defined'
                })
            }

            //Check Password
            const comparePassowd = bcrypt.compareSync(password.toString(), checkUser.password)
            // console.log('comparePassowd',comparePassowd);
            if (!comparePassowd) {
                resolve({
                    status: 'OK',
                    message: 'The password or user incorrect'
                })
            }
            const access_token = await genderAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            })
            const refresh_token = await genderRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            })
            // console.log('access_token',access_token,'refresh_token',refresh_token);
            resolve({
                status: 'OK',
                message: 'Login success',
                // data:checkUser
                access_token,
                refresh_token
            })

        } catch (e) {
            reject(e)
        }
    })
}
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        // const { name,email,password,confirmPassword, phone }=  userLogin 
        try {


            //check email in DB
            // console.log('id');
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log('checkUser update user',checkUser);
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user not defined'
                })
            }
            console.log('data', data);
            //chose 1 in 2
            const updatedUser = await User.findByIdAndUpdate({ _id: id }, data, { new: true })
            // const updatedUser = await User.findByIdAndUpdate({ _id: id },{data,'name': {$exists : `${}`}},{new:true})
            // const updatedUser = await User.findByIdAndUpdate(id,data)
            console.log('updatedUser', updatedUser);


            //Check Password
            // const comparePassowd = bcrypt.compareSync(password.toString(),checkUser.password)
            // console.log('comparePassowd',comparePassowd);
            // if(!comparePassowd){
            //     resolve({
            //         status:'OK',
            //         message:'The password or user incorrect'  
            //     })
            // }
            const access_token = await genderAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            })
            // const refresh_token = await genderRefreshToken({
            //     id:checkUser.id,
            //     isAdmin:checkUser.isAdmin,
            // })
            // console.log('access_token',access_token,'refresh_token',refresh_token);
            resolve({
                status: 'OK',
                message: 'Login success',
                data: updatedUser
                // access_token,    
                // refresh_token
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        // const { name,email,password,confirmPassword, phone }=  userLogin 
        // console.log('id services', id,typeof(id));
        // const revetId = ObjectId(id)

        try {

            const checkUser = await User.findOne({
                _id: id
            })
            // console.log('checkUser service',checkUser);

            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not found',
                    data: responed
                })
            }

            await User.findOneAndDelete({ _id: id });
            resolve({
                status: 'OK',
                message: `Delete  ${checkUser.email} success`,
                // data:updatedUser
                // access_token,    
                // refresh_token
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            //   console.log('allUser',allUser);
            resolve({
                status: 'ok',
                message: 'Success getAllUser',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('getDetails user',ids); 
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'GetDetails User Success',
                data: checkUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

//refreshToken in expired
// const refreshTokenService = (token)=>{
//     return new Promise(async(resolve,reject)=>{
//         try {
//             console.log('resolve',token);
//             resolve({
//                 status:'0k',
//                 message:'SUCCESS'
//             }) 
//         } catch (e) {
//             reject(e)
//         }
//     })
// }
const deleteManyUser = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            console.log('deleteManyUser Service trycatch', id);
            await User.deleteMany({ _id: id })
            resolve({
                status: 'OK',
                message: 'Delete Many Successful'
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
    // refreshTokenService
}