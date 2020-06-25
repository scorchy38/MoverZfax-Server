const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    moversName : {
        type : String
    },
    orderAmount : {
        type : Number
    },
    email : {
        type : String
    }
})

const Order = mongoose.model('Order' , orderSchema)
module.exports = Order