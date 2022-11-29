import mongoose from 'mongoose'
//Creating Schema using mongoose
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [4, 'Name should be minimum of 4 characters'],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password should be minimum of 8 characters']
    }
})

export default mongoose.model('User', userSchema)