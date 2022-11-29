import express from 'express'
import { registerp, getu, getind, getnom, removePR, updatePR } from "./product.controller.js"
const router = express.Router()

router.get('/user/:username', async (req, res) => {
    const userup = await getu(req.params, res)
    res.status(200).send(userup)
})

router.get('/ind/:id', async (req, res) => {
    const userup = await getind(req.params, res)
    res.status(200).send(userup)
})

router.get('/np', async (req, res) => {
    const userup = await getnom(req.body, res)
    res.status(200).send(userup)
})

router.post('/register', async (req, res) => {
    const usereg = await registerp(req, res)
    res.status(200).json(usereg)
})

router.delete('/:id', async (req, res) => {
    const userdel = await removePR(req, res)
    res.status(200).send(userdel)
})

router.put('/:id', async (req, res) => {
    const userup = await updatePR(req, res)
    res.status(200).send(userup)
})

export default router