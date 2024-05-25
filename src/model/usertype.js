import mongoose from "mongoose";

const usertypeSchema = mongoose.Schema({
    userType:String
},{timeStamps : true})

export const UserType = mongoose.model("userType",usertypeSchema);