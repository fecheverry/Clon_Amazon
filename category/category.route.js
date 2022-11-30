import express from 'express'
import { createCategory, getCategories, getOneCategory, updateCategory, deleteCategory } from "./category.controller.js"
import { AuthCheck } from "../middleware/autentication.js"

const router = express.Router();

//create category
router.post('/create', AuthCheck, async (req, res) => {
    const category = await createCategory(req, res)
    res.status(200).json(category)
})

//get all categories
router.get('/categories', async (req, res) => {
    const categories = await getCategories(req.query, res)
    res.status(200).json(categories)
})

//get a category
router.get('/', async (req, res) => {
    const category = await getOneCategory(req.body, res)
    res.status(200).json(category)
});


//update a category
router.patch('/update', AuthCheck, async (req, res) => {
    const category = await updateCategory(req, res)
    res.status(200).json(category)
});

//delete category
router.delete('/delete', AuthCheck, async (req, res) => {
    const category = await deleteCategory(req, res)
    res.status(200).json(category)
})



export default router;