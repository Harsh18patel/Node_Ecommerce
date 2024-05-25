import nodeMailer from "nodemailer";
import ejs from "ejs";

const transpoter = nodeMailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "josephine.kessler@ethereal.email",
      pass: "atHFzdD7fcBZ4GtcrZ",
    },
})

export const emailService = ({from,to,subject,text,html}) => {
   transpoter.sendMail({from,to,subject, text, html});
};



export const otpService = (email)=>{
    const code = Math.trunc(Math.random() * 1000000);
    console.log("--otp--",code);
    
    let path = __dirname + "/otptemplate/otpTemplate.ejs"

    ejs.renderFile(path,{code},(err,res) =>{
      let obj = {
        from:"admin@gmail.com",
        to: email,
        subject: "OTP for login",
        html:res,
      };
      emailService(obj);
    });

    return code;
};


// import { emailService } from "./emailService";

// const client = require("twilio")(
//   process.env.TWILIO_KEY,
//   process.env.TWILIO_TOKEN
// );

// export const sendOTP = (user) => {
//   const otp = Math.trunc(Math.random() * 1000000);
//   client.messages
//     .create({
//       body: `your otp is ${otp}`,
//       from: "+12512374821",
//       to: `+91${user.number || 7048324593}`,
//     })
//     .then((message) => {
//       user?.email &&
//         emailService({
//           to: user.email,
//           subject: "OTP for login",
//           text: `your one time password is ${otp}`,
//         });
//     });
//   return otp;
// };
