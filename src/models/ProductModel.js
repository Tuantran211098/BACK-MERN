const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, uniqui: true },
        image: { type: String },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countIntock: { type: Number, required: true },
        rating: { type: Number, required: true },
        description: { type: String, required: true },
        discount: { type: Number, required: true },
        selled: { type: Number },
        quantity: { type: Number }
    },
    {
        timestamps: true
    }
)
const Product = mongoose.model('Product', ProductSchema)
module.exports = Product