const Order = require('../models/OrderProduct')
const Product = require('../models/ProductModel')
const EmailService = require('../services/EmailService')
// const createOrder = (data) => {
//     return new Promise(async (resolve, reject) => {
//         const { user, orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = data
//         console.log('log data createOrder', data);
//         try {
//             console.log('here');
//             const newProduct = await Order.create({
//                 user
//             })
//             console.log('newProduct', newProduct);
//             resolve({
//                 status: 'OK',
//                 message: "Create Product in database success",
//                 data: newProduct
//             })

//             console.log('createOrder service', CreateOrder);
//             console.log('createOrder service', CreateOrder);

//         } catch (error) {
//             reject(error)
//         }
//     })
// }
const createOrder = (newProduct) => {

    return new Promise(async (resolve, reject) => {
        const { user, orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, isPaid, email } = newProduct
        try {
            console.log('SnewProduct', newProduct);
            console.log('SnewProduct', newProduct);
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findByIdAndUpdate({
                    _id: order.product,
                    countIntock: { $gte: order.amount }
                },
                    {
                        $inc: {
                            countIntock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    {
                        new: true
                    }
                )
                console.log('productDataproductData', productData, order);
                // console.log('SproductData', productData);
                if (productData) {
                    // const createOrder = await Order.create({
                    //     user: user,
                    //     orderItems: orderItems,
                    //     shippingAddress: {
                    //         fullName: fullName,
                    //         address: address,
                    //         city: city,
                    //         phone: phone
                    //     },
                    //     paymentMethod: paymentMethod,
                    //     itemsPrice: itemsPrice,
                    //     shippingPrice: shippingPrice,
                    //     taxPrice: 1,
                    //     totalPrice: totalPrice,
                    //     isPaid: isPaid ? true : false
                    // })
                    // if (createOrder) {
                    //     // console.log('newProduct createOrder', newOrder);
                    //     return {
                    //         status: 'OK',
                    //         message: "Create Product in database success",
                    //         data: createOrder
                    //     }
                    // }
                    return {
                        status: 'OK',
                        message: "SUCCESS",
                        data: productData
                    }
                } else {
                    console.log('trong day');
                    return {
                        status: 'OK',
                        message: "quantity not enough",
                        id: [order.product]
                    }
                }
                console.log('productData', productData);
            })
            const results = await Promise.all(promises)
            const dataId = []
            const newData = results && results.filter(item => console.log('itemitemitem', item))
            console.log('newData results', results, 'newData newData', newData, 'dataId', dataId);
            if (dataId.length) {
                const arrID = []
                dataId.forEach((item) => {
                    console.log('forEach dataId', dataId);
                    arrID.push(item)
                })
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm voi id${arrID.join(',')} không đủ hàng!`
                })
            } else {
                await EmailService.sendEmailCreateOrder(email, results)
                const createOrder = await Order.create({
                    user: user,
                    orderItems: orderItems,
                    shippingAddress: {
                        fullName: fullName,
                        address: address,
                        city: city,
                        phone: phone
                    },
                    paymentMethod: paymentMethod,
                    itemsPrice: itemsPrice,
                    shippingPrice: shippingPrice,
                    taxPrice: 1,
                    totalPrice: totalPrice,
                    isPaid: isPaid ? true : false
                })
                if (createOrder) {
                    // console.log('newProduct createOrder', newOrder);
                    return {
                        status: 'OK',
                        message: "Create Product in database success",
                        data: createOrder
                    }
                }
            }
            resolve({
                status: 'OK',
                message: "Sucsess",
            })

        } catch (error) {
            console.log('error', error);
            reject(error)
        }
    }
    )
}
const getDetailsOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderId = await Order.find({
                user: id
            })
            // console.log('getDetailsOrder', order);
            if (orderId === null) {
                resolve({
                    status: 'ERR',
                    message: "Khong tim thay ID USER",
                })
            }
            resolve({
                status: 'OK',
                message: "DA TIM THAY",
                data: orderId
            })
        } catch (error) {
            reject(error)
        }
    })
}
const getDetailsOrderItems = (id) => {
    return new Promise(async (resolve, reject) => {
        console.log('getDetailsOrderItems', id);
        try {

            const orderId = await Order.findById({
                _id: id
            })
            console.log('orderId', orderId);

            if (orderId === null) {
                resolve({
                    status: 'ERR',
                    message: "Khong tim thay ID USER",
                })
            }
            resolve({
                status: 'OK',
                message: "DA TIM THAY DATA details ITEMS IN Order",
                data: orderId
            })
        } catch (error) {
            reject(error)
        }
    })
}
const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        console.log('YKLMZ', data);
        try {
            // const findOrderId = await Order.findById({
            //     _id: id
            // })
            // if (findOrderId === null) {
            //     resolve({
            //         status: 'ERR',
            //         message: "KHÔNG TÌM THẤY SẢN PHẨM NÀY",

            //     })
            // }
            // const deleteOrderItems = await Order.findByIdAndDelete({
            //     _id: id
            // })
            // resolve({
            //     status: 'OK',
            //     message: `Xóa sản phẩm thành công `,
            //     data: deleteOrderItems
            // })
            const promises = data.map(async order => {
                const orderData = await Product.findOneAndUpdate({
                    _id: order?.product,
                    selled: { $gte: order.amount }
                },
                    {
                        $inc: {
                            countIntock: +order.amount,
                            selled: -order.amount
                        }
                    },
                    {
                        new: true
                    }
                )
                // console.log('orderData', orderData);
                if (orderData) {
                    console.log('orderData', orderData);
                    const deleteOrderItems = await Order.findByIdAndDelete({
                        _id: id
                    })
                    if (deleteOrderItems === null) {
                        resolve({
                            status: 'ERR',
                            message: "KHÔNG TÌM THẤY SẢN PHẨM NÀY",

                        })
                    }

                }
                else {
                    return {
                        status: 'OK',
                        message: "err",

                    }
                }
            })
            const results = await Promise.all(promises)
            console.log('DELETERESU', results);
            console.log('DELETERESU', results);
            const newData = results && results.filter((items) => items.id)
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `sAN PHAM ${newData.join(', ')} khong ton tai`,

                })
            }
            resolve({
                status: 'OK',
                message: `Success`,

            })
        } catch (error) {
            reject(error)
        }
    })
}
const getAllOrderSer = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find()
            console.log('ser getAllOrderAdmin', order);
            resolve({
                status: 'OK',
                message: `Success`,
                data: order
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createOrder,
    getDetailsOrder,
    getDetailsOrderItems,
    cancelOrderDetails,
    getAllOrderSer
}