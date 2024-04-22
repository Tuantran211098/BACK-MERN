const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const dotenv = require('dotenv').config({path: 'src/.env'});
const dotenv = require('dotenv').config({ path: 'src/.env' });
const routes = require('./routes/index.js')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
//  dotenv.config()

const app = express();

const port = process.env.PORT || 3002
const corsOptions = {
    origin: true,
    credentials: true,
};
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json())
app.use(cookieParser())
routes(app);

console.log('process', process.env.MONGODB, 'process.env.client id', process.env.CLIENT_ID);

mongoose.connect(`${process.env.MONGODB}`)
    .then(() => {
        console.log('Connect thành công nha');
    })
    .catch((err) => {
        console.log('Không kết nối được csdl', err);
    })
app.listen(port, () => {
    console.log('Serve is running port', port);
})