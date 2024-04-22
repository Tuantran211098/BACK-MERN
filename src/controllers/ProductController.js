
const ProductService = require('../services/ProductService')
const createProduct = async (req, res) => {
    try {
        const { name, image, type, countIntock, price, rating, description, discount } = req.body
        if (!name || !image || !type || !countIntock || !price || !description || !rating || !discount) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required nhan'
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body

        console.log('updateProduct', data);
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: `No such id : ${productId}`
            })
        }
        const respone = await ProductService.updateProduct(productId, data)
        return res.status(200).json(respone)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: e
        })
    }
}
const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The get details product not found'
            })
        }
        const respone = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(respone)
    } catch (e) {
        return res.status(200).json({
            status: 'ERR',
            message: e
        })
    }
}
const deleteProduct = async (req, res) => {
    try {
        console.log('req', req.params.id);
        const checkId = req.params.id
        if (!checkId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The Products is not found in database!'
            })
        }
        const respone = await ProductService.deleteProduct(checkId)
        return res.status(200).json(respone)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: e
        })
    }
}


//getAllProduct
const getAllProduct = async (req, res) => {

    try {
        // console.log('req',req);
        const { limit, page, sort, filter } = req.query
        console.log('controller getAllProduct', limit, page, filter);
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            status: "ERROR",
            message: e
        })
    }
}
const getAllType = async (req, res) => {

    try {
        // console.log('req',req);
        // const { limit, page, sort, filter } = req.query
        const reponse = await ProductService.getAllType()
        return res.status(200).json(reponse)
    } catch (e) {
        return res.status(404).json({
            status: "ERROR",
            message: e
        })
    }
}

const deleteManyProduct = async (req, res) => {
    try {

        const ids = req.body.ids
        console.log('deleteManyProduct control', ids);
        if (!ids) {

            return res.status(200).json({
                status: 'ERR',
                message: 'The ids required!'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: e
        })
    }
}
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    getAllType,
    deleteManyProduct
}