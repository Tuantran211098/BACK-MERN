const nodemailer = require("nodemailer");
const dotenv = require('dotenv').config({ path: 'src/.env' });
const sendEmailCreateOrder = async (email, data) => {
    // const { user } = data.data
    console.log('sendEmailCreateOrder', email, data, 'data.data', data[0].data.orderItems);
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ACC,
            pass: process.env.MAIL_PASS,
        },
    });

    // Loop data
    var arrayItems = "";
    var n;
    const itemsed = data[0].data.orderItems
    // var attachments = []
    for (n in itemsed) {
        arrayItems += (
            '<ul>' +
            '<li>' + '<b>' + 'Tên sản phẩm: ' + itemsed[n].name + '<b>' + '</li>' +
            '<li>' + 'Ảnh: ' + itemsed[n].image + '</li>' +
            '<li>' + 'Giá: ' + itemsed[n].price + '</li>' +
            '<li>' + 'Số lượng: ' + itemsed[n].amount + '</li>' +
            '<li>' + 'Tạm tính: ' + (itemsed[n].price * itemsed[n].amount) + '</li>' +
            '<li>' + 'Mô tả: ' + itemsed[n].descript + '</li>' +
            '</ul></br>'
        );
        // attachments.push(itemsed.image)
        console.log('arrayItems', itemsed[n], arrayItems);
    }
    const info = await transporter.sendMail({
        from: process.env.MAIL_ACC, // sender address
        to: email, // list of receivers
        subject: "MernStack - Đặt hàng thành công", // Subject line
        text: "Hello world?", // plain text body
        // html: `<p>Hello world?</p>`
        html: `<div>
                <span><b>Tổng giá trị đơn hàng của Quý khách là: ${data[0].data.totalPrice}</b></span></br>
                <span><b>Thanh toán bằng:</b> ${data[0].data.paymentMethod === 'later_money' ? 'Thanh toán sau khi nhận hàng' : 'Thanh toán bằng paypal'}</span></br>
                <span>${arrayItems}</span>
            </div>`
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = {
    sendEmailCreateOrder
}