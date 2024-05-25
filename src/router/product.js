import  express  from "express";
import { Product } from "../model/product";
import { authlog } from "../auth/auth";
import { create, deleteproduct, getAll, updateProduct } from "../controller/product";

const router = new express.Router();

router.use(express.json());

router.post("/create",create);

router.get("/getAll",getAll);

router.put("/update/:id",updateProduct);

router.delete("/delete/:id",authlog,deleteproduct);

export default router;



