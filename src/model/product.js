import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: String,
    brand:String,
    desc:String,
    price:Number,
    discount:String,
    availabelStock:Number,
    gender:[String],
    color:[String],
    category:[String],
    size:[String],
},{timeStamps: true})

export const Product = mongoose.model("product",productSchema);