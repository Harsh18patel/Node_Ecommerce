import { model } from "../model";


let useToken = (resData)=>{
    return jwt.sign({email:resData?.email, _id:resData._id},process.env.SECRET_KEY);
}

export const create = async(req,res)=>{
    let input = req?.body;
    model?.Admin.create(input)
    .then((resData)=>{
        let token = useToken(resData)
        res.send({
            status: 200,
            data : resData,
            token
          });

    })
    .catch((err)=>{
        res.status(404).send(err);
    })
};

export const getAll = (req,res)=>{
    model?.Admin.find({})
    .then((resData)=>{
        res.status(200).send(resData);
    })
    .catch((err)=>{
        res.status(404).send(err);
    })
};