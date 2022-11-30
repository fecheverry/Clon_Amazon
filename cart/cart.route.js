import express from 'express'
import { getCart, addProduct, deleteProduct, buyCart } from "./cart.controller.js"
import { AuthCheck } from "../middleware/autentication.js"

const router = express.Router();

router.get('/', AuthCheck, async (req, res) => {
    const cart = await getCart(req, res)
    res.status(200).json(cart)
})


router.patch('/add', AuthCheck, async (req, res) => {
    const cart = await addProduct(req, res)
    res.status(200).json(cart)
})


router.delete('/delete', AuthCheck, async (req, res) => {
    const cart = await deleteProduct(req, res)
    res.status(200).json(cart)
});



router.post('/', AuthCheck, async (req, res) => {
    const cart = await buyCart(req, res)
    res.status(200).json(cart)
});



export default router;
