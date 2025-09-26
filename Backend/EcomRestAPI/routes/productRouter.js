import express from "express";
import productController from "../controller/products/productController";
import { auth } from "../middlewares/auth";
import admin from "../middlewares/admin";
import upload from "../middlewares/upload";
export const productRouter = express.Router();

productRouter.post('/', [auth, admin, upload.single('image')], productController.addProduct)
productRouter.get('/', productController.getAllProducts)
productRouter.get('/:id', productController.getProduct)
productRouter.put('/:id', [auth, admin], productController.updateProduct)
productRouter.delete('/:id', [auth, admin], productController.deleteProduct)