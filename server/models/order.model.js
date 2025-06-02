import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
    },
    products : [{
        product: {
            type : mongoose.Schema.ObjectId,
            ref : "Product"
        },
        quantity : {
            type : Number,
            default : 1
        },
        size : {
            type : String,
            default : ""
        }
    }],
    paymentId : {
        type : String,
        default : ""
    },

    payment_status : {
        type : String,
        default : ""
    },
    status: {
        type : String,
        enum : ["placed", "shipped", "delivered"],
        default : "placed"
    },
    delivery_address : {
        type : mongoose.Schema.ObjectId,
        ref : "address"
    },
    subTotal : {
        type : Number,
        default : 0
    },
    total : {
        type : Number,
        default : 0
    },
}, {
    timestamps: true
})

const OrderModel = mongoose.model('order', orderSchema)

export default OrderModel