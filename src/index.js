import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import userRouter from "./router/user"
import productRouter from "./router/product"
import usertypeRouter from "./router/usertype"
import orderRouter from "./router/order"
import adminRouter from "./router/admin"

import { connectDB } from "./db";
import { addPreData } from "./db/addPredefineData/addPreData";
import path from "path";

const app = express();

const port = process.env.PORT || 3000;
console.log("-----------  process.env.PORT----------->", process.env.PORT); 

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/user",userRouter);
app.use("/product",productRouter);
app.use("/usertype",usertypeRouter);
app.use("/order",orderRouter);
app.use("/admin",adminRouter);


app.use(express.static(path.join(__dirname, "..", "\\")));

app.get("/",(req,res)=>{
    console.log("messgae recevied",res);
    res.send("message here");
})



app.listen(port,()=>{
    connectDB();
    addPreData();
    console.log(`server is running on http://localhost:${port}`);
})