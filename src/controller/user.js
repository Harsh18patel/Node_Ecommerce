import { model } from "../model";
import jwt from "jsonwebtoken";
import { emailService, otpService } from "../function/emailService";


const useToken = (resData) => {
    return jwt.sign({email:resData.email, userId:resData?._id}, process.env.SECRET_KEY);
};

export const getAll =  (req,res)=>{
    model?.User.find({})
    .then((resData)=>{
        console.log("resdata",resData);
        res.send(resData);
    })
    .catch((err)=>{
        res.send(err);
    });
};



export const create = (req, res) => {
 

    let input = req.body;
    // console.log("reqbody", req.body);
    model?.User.create(input)
    .then((resData)=>{
      res.send(resData);
    })
    .catch((err)=>{
      res.send(err);
    })
      
  };



export const updateUser =  (req,res)=>{
    let input = req?.params?.id;
    console.log("input",input);
    // User.findByIdAndUpdate(input,{email: "kashyap100@gmail.com"},{new: true})
    model?.User.findByIdAndUpdate(input,req?.body,{new:true})
    .then((resData)=>{
      console.log("resdataupdate",resData);
      res.send(resData)
    })
    .catch((err)=>{
      res.send(err)
    })
  };


export const passwordReset = async(req,res)=>{
    let matchUser = await model?.User.findById(req?.params?.id)
    if(!matchUser) return new Error("user not found")
    else{
      if(req?.body?.password)
      {
        matchUser.password = req?.body?.password
      }
      await matchUser.save()
      res.send("password changed")
    }
  };

  

export const login = (req,res)=>{
    let {email,password} = req?.body;

    model?.User.findOne({email})
    .then(async(resData)=>{
      let match = await resData.validatePassword(password);
      console.log("---matchpassword---",password);
      if(match)
      {

          const token = useToken(resData)
          res.status(200).json({
            message: "Login successful",
            token: token,
            user: resData
          })
        
      }
      else{
        res.status(404).send("password not same")
      }
    })
    .catch((err)=>{
      res.send(err)
    })
  };

export const loginotp =  (req,res)=>{
    let{OTP} = req?.body;
    console.log("--otp---",req?.body);

    model?.User.findOne({OTP})
    .then(async(resData)=>{
     
      if(resData)
      {
        const token = useToken(resData)
        // emailService();
        resData.OTP = " ";
        resData.save();
          res.status(200).json({
            message: "Login successful",
            token: token,
            user: resData
          })
      }
      else{
        res.status(404).send("otp not same")
      }
    })
    .catch((err)=>{
      res.status(404).send(err)
    })
  };


export const signup = async (req,res)=>{
    let input = req?.body;
    model?.User.create(input)
    .then((resData)=>{
      let token = useToken(resData)
      // emailService();
      res.send({
        status: 200,
        data : resData,
        token
      });
    })
      .catch((err)=>{
        res.send({status:404, message: err.message});
        console.log("errr",err);
      });
  };
 

export const deleteUser = (req,res)=>{
    let input = req?.params.id;
    model?.User.findByIdAndDelete(input)
    .then((resData)=>{
      console.log("resdataDelete",resData);
      res.send(resData)
    })
    .catch((err)=>{
      res.send(err)
    })
  };

export const otp = async(req,res)=>{
    const user = await model?.User.findOne({ email: req?.body?.email });
    if (user) {
      let otp = otpService(user.email);
      console.log("---otps--",otp);
      user.OTP = otp;
      console.log("---user.otp",user.OTP);
      await user.save();
      res.send({ status: "200", data: user });
    } else {
      res.send({ status: "400", message: "User not found ...!" });
    }
  };
