import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
dotenv.config()
import userRoute from "./user/user.route.js"
import productRoute from "./product/product.route.js"
import reviewRoute from "./review/review.route.js"
import categoryRoute from "./category/category.route.js"
const PORT = process.env.PORT || 3000
const app = express()

export function TestApp() {
    const app = express()

    app.use(express.json())
    app.use(cookieParser())

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', '*')

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).json({})
        }
        next();
    });

    app.get('/', (req, res) => {
        res.status(200).send("Proyecto final Backend")
    })

    app.use(express.json())
    app.use("/user", userRoute)
    app.use("/product", productRoute)
    app.use("/review", reviewRoute)
    app.use("/category", categoryRoute)

    app.use(async (req, res) => {
        res.status(404).json({ message: "Not found." })
    });

    return app
}

export function App() {
    const app = TestApp()

    mongoose.connect(process.env.MONGODB_URI, {
    })
        .then(() => console.log("Conectado a MongoDBAtlas"))
        .catch((err) => console.log(err))

    return app
}
