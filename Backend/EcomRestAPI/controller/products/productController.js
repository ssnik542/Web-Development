
import Joi from "joi"
import path from 'path'
import CustomErrorHandler from '../../services/customErrorHandler'
import { PRODUCT } from '../../models'
import fs from 'fs'


const productController = {

    async addProduct(req, res, next) {
        console.log(req.body)
        const productSchema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            size: Joi.string().required(),
            image: Joi.string()
        })
        const { error } = productSchema.validate(req.body)
        if (error) {
            return next(error);
        } else {

            const product = await PRODUCT.create({
                name: req.body.name,
                price: req.body.price,
                size: req.body.size,
                image: `/uploads/${req.file.filename}`
            })

            res.status(201).json(product)
        }
    },

    async getAllProducts(req, res, next) {
        try {
            const Products = await PRODUCT.find();
            res.status(200).json(Products);
        } catch (error) {
            return next(error)
        }

    },

    async getProduct(req, res, next) {
        try {
            const product = await PRODUCT.findById(req.params.id).select(' -updatedAt -__v')
            if (!product) {
                return next(CustomErrorHandler.notFound("No such product found"))
            }
            res.status(200).json(product)
        } catch (error) {
            return next(error)
        }
    },

    async updateProduct(req, res, next) {
        const { name, price, size } = req.body
        const productSchema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            size: Joi.string().required(),
            image: Joi.string()
        })
        const { error } = productSchema.validate(req.body)
        if (error) {
            return next(error);
        }
        else {
            try {
                const product = await PRODUCT.findByIdAndUpdate(req.params.id, {
                    name,
                    price,
                    size,
                    // ...(req.file && { image: filePath })
                }, { new: true })
                if (!product) {
                    return next(CustomErrorHandler.notFound('The product you are trying to update does not exist'))
                }
                res.json(product)
            } catch (error) {
                return next(error)
            }
        }
    },

    async deleteProduct(req, res, next) {
        try {
            const product = await PRODUCT.findOneAndDelete({ _id: req.params.id })
            if (!product) {
                return next(CustomErrorHandler.notFound('The product you are trying to delete does not exist'))
            }
            const imgPath = product._doc.image;
            console.log(path.resolve('./public') + imgPath)
            fs.unlink(`D:/Projects/backend/Rest API/public/${imgPath}`, (err) => {
                if (err) {
                    return next(err)
                }

                return res.json(product)
            })
        } catch (error) {
            return next(error)
        }
    }
}

export default productController