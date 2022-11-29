import express from 'express'
import { seeu, registeru, loginu, logint, removeUS, updateUS } from "./user.controller.js"
const router = express.Router()

router.get('/', async (req, res) => {
   const usersee = await seeu(req.body, res)
   res.status(200).json(usersee)
})

router.post('/register', async (req, res) => {

   const usereg = await registeru(req.body, res)
   res.status(200).json(usereg)
})

router.post('/loginu', async (req, res) => {
   const userlogu = await loginu(req.body, res)
   res.status(200).send(userlogu)
})

router.get('/logint/:id', async (req, res) => {
   const userlogt = await logint(req.params, res)
   await res.status(200).send(userlogt)
})

router.delete('/:id', async (req, res) => {
   const userdel = await removeUS(req.params, res)
   res.status(200).send(userdel)
})

router.put('/:id', async (req, res) => {
   const userup = await updateUS(req.params, req.body, res)
   res.status(200).send(userup)
})

export default router