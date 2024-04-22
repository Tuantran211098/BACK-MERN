const express = require('express')
const OrderController = require('../controllers/OrderController')
const router = express.Router()
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleware')
router.post('/create', authUserMiddleWare, OrderController.createOrder)
router.get('/get-order-details/:id', authUserMiddleWare, OrderController.getDetailsOrder)
router.get('/get-order-details-items/:id', authUserMiddleWare, OrderController.getDetailsOrderItems)

router.delete('/cancel-order/:id', OrderController.cancelOrderDetails)
router.get('/get-all-order', authMiddleWare, OrderController.getAllOrderAdmin)
// router.delete('/delete-user/:id',authMiddleWare,userController.deleteUser)
// router.get('/getAll',(req,res)=>{
//     return res.status(200).json({data:'HELLO GETALL'})
// })
module.exports = router   