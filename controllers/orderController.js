const Order = require('../models/Order')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')


// fake function
const fakeStripeAPI = async ({ amount, currency }) => {
    const client_secret = 'someRandomValue'
    return { client_secret, amount }
}

const createOrder = async (req, res) => {

    const { items: cartItems, tax, shippingFee } = req.body
    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No Cart Items Provided')
    }
    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError('Please provide tax and shipping fee')
    }

    // checking if product exist
    let orderItems = []; let subtotal = 0
    for (const item of cartItems) {
        const dbProduct = await Product.findOne({ _id: item.product })
        if (!dbProduct) {
            throw new CustomError.NotFoundError
                (`No product with id: ${item.product}`)
        }

        const { name, price, image, _id } = dbProduct
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image,
            product: _id
        }

        // Add Item to Order
        orderItems = [...orderItems, singleOrderItem]
        // Calculate subProduct
        subtotal += item.amount * price
    }

    // calculate Total
    const total = tax + shippingFee + subtotal

    // get client secret
    const paymentIntent = await fakeStripeAPI({
        amount: total,
        currrency: 'usd'
    })

    // creating the order
    const order = await Order.create({
        orderItems,
        total,
        subtotal,
        tax,
        shippingFee,
        clientSecret: paymentIntent.client_secret,
        user: req.user.userId
    })

    res.status(StatusCodes.CREATED).json({ order, clientSecret: order.clientSecret })
}

const getAllOrders = async (req, res) => {

    const orders = await Order.find({})
    res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const getSingleOrder = async (req, res) => {

    const { id: orderId } = req.params
    const order = await Order.findOne({ _id: orderId })
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id: ${orderId}`)
    }

    checkPermissions(req.user, order.user)
    res.status(StatusCodes.OK).json({ order })
}

const getCurrentUserOrders = async (req, res) => {

    const orders = await Order.find({ user: req.user.userId })
    res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const updateOrder = async (req, res) => {

    const { id: orderId } = req.params
    const { paymentIntentId, status } = req.body

    const order = await Order.findOne({ _id: orderId })
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id: ${orderId}`)
    }

    checkPermissions(req.user, order.user)
    order.paymentIntentId = paymentIntentId
    order.status = status
    await order.save()

    res.status(StatusCodes.OK).json({ order })
}

module.exports = { updateOrder, createOrder, getAllOrders, getCurrentUserOrders, getSingleOrder }
