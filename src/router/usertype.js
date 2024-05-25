import express  from "express";
import { UserType } from "../model/usertype";

const router = new express.Router();

router.use(express.json());

router.post("/create",(req,res)=>{
    UserType.create({
        userType : "admin"
    })
    .then((resData)=>{
        console.log("resdata usertype",resData);
        res.send(resData);
    })
    .catch((err)=>{
        res.send(err);
    })
})

export default router;