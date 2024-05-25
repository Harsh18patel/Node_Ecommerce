import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name: String,
    email:String,
    age:Number,
    
},{timestamps : true})

export const Admin =  mongoose.model("admin",adminSchema);