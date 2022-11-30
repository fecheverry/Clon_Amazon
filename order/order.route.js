import express from 'express'
import { buyCart, OrdersByUser } from "./order.controller.js"
import { AuthCheck } from "../middleware/autentication.js"

const router = express.Router();

//buy cart
router.post('/buy', AuthCheck, async (req, res) => {
    const order = await buyCart(req, res)
    res.status(200).json(order)
})

//get orders by user
router.get('/orders', AuthCheck, async (req, res) => {
    const order = await OrdersByUser(req, res)
    res.status(200).json(order)
})

export default router;