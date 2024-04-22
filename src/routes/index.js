const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')
const PaymentRouter = require('./PaymentRouter')
const routes = (app) => {
  // console.log('app',app);
  // app.get('/api/user',(req,res)=>{
  //     return res.send('Hello every day')
  // })

  // app.get('/user',(req,res)=>{
  //     return res.send('Hello every day')
  // })


  // console.log("do");
  app.use('/api/user', UserRouter)
  app.use('/api/product', ProductRouter)
  app.use('/api/order', OrderRouter)
  app.use('/api/payment', PaymentRouter)
}
module.exports = routes