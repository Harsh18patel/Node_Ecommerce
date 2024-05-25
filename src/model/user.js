import mongoose from "mongoose";
import bcrypt from "bcrypt";

const  ObjectID = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
    userName: String,
    email: String,
    password:String,
    phoneNumber:Number,
    dob:String,
    age:Number,
    gender:String,
    adminID: {
        type: ObjectID,
        ref: "admin",
    },
    OTP:String,
    address: [
        {
            line1:String,
            city:String,
            state:String,
        },
    ],
    pincode:Number,
    userType:String,
},{timestamps : true});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
      this.password = await  bcrypt.hash(this.password,12)
    }
})

userSchema.methods.validatePassword = async function(password){
    console.log("---thispassword--",this.password);
    console.log("---password--",password);
    return await bcrypt.compare(password, this.password)
}






export const User = mongoose.model("user",userSchema);









// userSchema.pre("save", async function(next){
//     if(this.isModified("password"))
//     {
//       this.password = await  bcrypt.hash(this.password, 12)
//     }
// })

// userSchema.methods.validatePassword = async function(password)
// {
//     console.log("---thispassword--",this.password);
//     console.log("---password--",password);
//     return await bcrypt.compare(password,this.password);
// }
