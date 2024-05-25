import express  from "express";
import { auth } from "../auth/auth";
import { Admin } from "../model/admin";
import jwt from "jsonwebtoken";
import { create, getAll } from "../controller/admin";

let router = express.Router();

let useToken = (resData)=>{
    return jwt.sign({email:resData?.email, _id:resData._id},process.env.SECRET_KEY);
}

router.post("/create",create);

router.get("/getAll",getAll);

export default router;