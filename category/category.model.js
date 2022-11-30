import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [4, 'Name should be minimum of 4 characters'],
        unique: true
    },
    products: [
        {
            type: mongoose.Types.ObjectId, ref: 'product', required: true
        }
    ],
})

export default mongoose.model('category', categorySchema);