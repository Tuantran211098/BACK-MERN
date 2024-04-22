const OrderService = require('../services/OrderService')
const createOrder = async (req, res) => {
    const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body
    try {
        // console.log('CreateOrder controller', req.body);
        console.log('body createOrder 1', req.body);
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Các trường đang bị thiếu thông tin'
            })
        }

        const response = await OrderService.createOrder(req.body)
        // console.log('response con', response);
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error
        })
    }
}
const getDetailsOrder = async (req, res) => {

    try {
        const userId = req.params.id
        const token = req.headers.token;
        // console.log('getDetailsOrder', token, req);
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user is required'
            })
        }
        const response = await OrderService.getDetailsOrder(userId, token)
        // console.log('response', response);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error
        })
    }
}
const getDetailsOrderItems = async (req, res) => {

    try {
        const userId = req.params.id
        const token = req.headers.token;
        console.log('getDetailsOrderItems', token, req);
        if (!userId && !token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId & token is required'
            })
        }
        const response = await OrderService.getDetailsOrderItems(userId, token)
        // console.log('response', response);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error
        })
    }
}
const cancelOrderDetails = async (req, res) => {
    try {
        const id = req.params.id
        const token = req.headers.token
        const data = req.body
        console.log('log id', id, req.body);
        if (!id) {
            // console.log('sai');
            return res.status(200).json({
                status: 'ERR',
                message: 'The id & token is required'
            })
        }
        // const response = {}
        const response = await OrderService.cancelOrderDetails(id, data)
        console.log('xyzlm', orderData);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: `controller err ${error}`
        })
    }
}
const getAllOrderAdmin = async (req, res) => {
    try {

        const data = await OrderService.getAllOrderSer(req.body)
        console.log('con getAllOrderAdmin', data);
        return res.status(200).json(data)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: `controller err ${error}`
        })
    }
}

module.exports = {
    getAllOrderAdmin,
    createOrder,
    getDetailsOrder,
    getDetailsOrderItems,
    cancelOrderDetails,

}