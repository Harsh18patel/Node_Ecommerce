import express from "express";
import { auth, authlog, otplog } from "../auth/auth";
import { create, deleteUser, getAll, login, loginotp, otp, passwordReset, signup, updateUser } from "../controller/user";
import multer from "multer";
import fs from "fs";



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./public/";
    // // Check if the directory exists, if not, create it
    // // fs.existsSync  This function checks whether the specified path exists in the file system.
    // fs.mkdirSync This function creates a new directory synchronously.
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req,file,cb)=>{
    cb(null, Date.now().toString()+'.'+`${file.originalname.split('.').pop()}`); 
  },
});


const upload = multer({ storage });
const router = new express.Router();

router.use(express.json());

router.get("/getAll", getAll);

router.post("/create",create);

router.put("/updates/:id",updateUser);

router.put("/password-reset/:id",passwordReset);

router.post("/login",authlog,login);

router.post("/login-otp",loginotp);

router.post("/signUp",signup);

router.delete("/delete/:id",deleteUser);

router.post("/otp",otp);

// router.post("/uploads", upload.single("profile"), (req,res)=>{
//   console.log("----file--",req.file);
//   res.status(200).send(req.file);
// })

router.post("/uploads", upload.array("photos", 12), (req,res)=>{
  console.log("---multifile--", req.files);
  res.status(200).send(req.files)
})



export default router;


