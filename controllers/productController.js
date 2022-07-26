const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const createProduct = async (req, res) => {

    req.body.user = req.user.userId
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {

    const products = await Product.find({})
    res.status(StatusCodes.OK).json({ products, count: products.length })
}

const getSingleProduct = async (req, res) => {

    const { id: productId } = req.params
    const product = await Product.findOne({ _id: productId }).populate('reviews')

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id: ${productId}`)
    }
    res.status(StatusCodes.OK).json({ product })
}

const updateProduct = async (req, res) => {

    const { id: productId } = req.params
    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
        new: true,
        runValidators: true
    })

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id: ${productId}`)
    }
    res.status(StatusCodes.OK).json({ product })
}

const deleteProduct = async (req, res) => {

    const { id: productId } = req.params
    const product = await Product.findOne({ _id: productId })

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id: ${productId}`)
    }

    await product.remove()
    res.status(StatusCodes.OK).json({ msg: 'Success !! Product Removed.' })
}

const uploadImage = async (req, res) => {

    if (!req.files) { throw new CustomError.BadRequestError('No File Uploaded') }

    const productImage = req.files.image
    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please Upload Image')
    }

    const maxSize = 1024 * 1024 * 10
    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError('Please Upload Image smaller than 10MB')
    }

    // Uploading the Image on the Cloud
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: false,
        folder: 'E_Commerce'
    })

    // Delete the tem files from the server
    fs.unlinkSync(req.files.image.tempFilePath)

    // return the url where the image is stored on the cloud : secure_url 
    return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}

module.exports = { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage }