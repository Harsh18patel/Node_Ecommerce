import { model } from "../model";

export const create = (req,res)=>{
    let input = req?.body;
    model?.Product.create(input)
    .then((resData)=>{
        console.log("resdata product",resData);
        res.send(resData);
    })
    .catch((err)=>{
        res.send(err);
    })
};

export const getAll = (req,res)=>{
    model?.Product.find({})
    .then((resdata)=>{
        console.log("product get",resdata);
        res.send(resdata);
    })
    .catch((err)=>{
        console.log("error in find",err);
        res.send(err);
    })
};

export const updateProduct = (req,res)=>{
    let input = req?.params?.id;
    model?.Product.findByIdAndUpdate(input,req?.body,{new:true})
    .then((resData)=>{
        console.log("resdata update",resData);
        res.send(resData);
    })
    .catch((err)=>{
        console.log("error update",err);
        res.send(err);
    })
};

export const deleteproduct = (req,res)=>{
    let input = req?.params?.id;
    model?.Product.findByIdAndDelete(input)
    .then((resData)=>{
        console.log("resdata delete",resData);
        res.send(resData);
    })
    .catch((err)=>{
        console.log("delete error",err);
        res.send(err);
    })
};