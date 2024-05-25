import { model } from "../model";

export const create = (req, res) => {
    console.log("----loginuser---", req.loginUser);
  
    req.body.userId = req?.loginUser?._id;
    model?.Order.create(req.body)
      .then((resData) => {
        res.status(200).send(resData);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  };
  
export const getAll = (req, res) => {
    model?.Order.find({})
      .populate([
        { path: "productID", select: "productName  price" },
        {
          path: "userID",
          select: "userName  email ",
          populate: {
            path: "adminID",
            select: "name",
          },
        },
      ])
      .then((resData) => {
        res.status(200).send(resData);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  };