import jwt from "jsonwebtoken";
import { User } from "../model/user";

export const auth = async (req,res,next)=>{

    let token = req?.headers?.authorization?.split?.(" ")?.[1];
    console.log("------->",token);
    if (!token) return res.status(500).send("Session is invalid");
    let data = jwt?.verify?.(token, process.env.SECRET_KEY);
    console.log("🚀 ~ auth ~ data:", data)
    let matchUser = await User.findById(data.userId);
    req.loginUser = matchUser;
    if (!matchUser) return res.status(500).send("session is invalid");
    else next();

};

export const authlog = async (req,res,next)=>{

    let token = req?.headers?.authorization?.split?.(" ")?.[1];
    console.log("------->",token);
    if (!token) return res.status(500).send("Session is invalid");
    let data = jwt?.verify?.(token, process.env.SECRET_KEY);
    console.log("🚀 ~ authlog ~ data:", data)
    if (!data) return res.status(500).send("Session Data is invalid");
    let matchUser = await User.findById(data.userId);
    if (matchUser?.userType !== "admin") return res.status(404).send("You are--- not authorized");
    if (!matchUser) return res.status(500).send("you are not autorized");
    else next();

};



