import mongoose from 'mongoose'
//Creating Schema using mongoose
const productSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    user: {
        type: String
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        require: true
    }
})

export default mongoose.model('product', productSchema)