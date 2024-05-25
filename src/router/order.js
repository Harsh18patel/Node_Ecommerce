import express from "express";
import { Order } from "../model/order";
import { auth } from "../auth/auth";
import { create, getAll } from "../controller/order";

let router = express.Router();

router.post("/create", auth, create);

router.get("/getAll", getAll);

export default router;
