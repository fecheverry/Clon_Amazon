import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId, ref: 'user', required: true
    },
    user: {
        type: String, required: true
    },
    idProduct: {
        type: mongoose.Types.ObjectId, ref: 'product', required: true
    },
    product: {
        type: String, required: true
    },
    description: {
        type: String, required: false
    },
    calification: {
        type: Number, required: true
    }
})

export default mongoose.model('review', reviewSchema);