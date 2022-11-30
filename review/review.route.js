import express from 'express'
import { createReview, UserReviews, ReviewsByProduct, ReviewsByCalification, DeleteReview } from "./review.controller.js"
import { AuthCheck } from "../middleware/autentication.js"

const router = express.Router();

router.post('/create', AuthCheck, async (req, res) => {
    const review = await createReview(req, res)
    res.status(200).json(review)

})

//get user reviews
router.get('/user/:username', async (req, res) => {
    const review = await UserReviews(req.params, res)
    res.status(200).json(review)
})

//get reviews by product
router.get('/reviews', async (req, res) => {
    const review = await ReviewsByProduct(req.query, res)
    res.status(200).json(review)
})

//get reviews by calification
router.get('/reviews', async (req, res) => {
    const review = await ReviewsByCalification(req.query, res)
    res.status(200).json(review)
})

//delete review
router.delete('/reviews', AuthCheck, async (req, res) => {
    const review = await DeleteReview(req, res)
    res.status(200).json(review)
})


export default router;