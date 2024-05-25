import mongoose from "mongoose";

export const connectDB = (params)=>{

    return mongoose
    .connect("mongodb://127.0.0.1:27017/amazon")
    .then(()=>{
        console.log("database connected");
    })
    .catch((err)=>{
        res.send(err);
    })
}