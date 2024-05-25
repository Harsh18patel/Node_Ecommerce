import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = mongoose.Schema({
    productID:{
        type: ObjectId,
        ref:"product",
    },
    userID:{
        type: ObjectId,
        ref: "user",
    },
},{timestamps: true});

export const Order = mongoose.model("order",orderSchema);