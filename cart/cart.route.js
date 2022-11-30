import express from 'express'
import { getCart, addProduct, deleteProduct, buyCart } from "./cart.controller"

const router = express.Router();

router.get('/', async (req, res) => {
    const cart = await getCart(req.query, res)
    res.status(200).json(cart)
})


router.patch('/', async (req, res) => {
    const cart = await addProduct(req.query, res)
    res.status(200).json(cart)
})


router.delete('/', async (req, res) => {
    const cart = await deleteProduct(req.query, res)
    res.status(200).json(cart)
});



router.post('/', async (req, res) => {
    const cart = await buyCart(req.query, res)
    res.status(200).json(cart)
});



export default router;
