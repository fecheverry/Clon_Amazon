import User from "./user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Verify } from "../middleware/autentication.js"

export async function seeu() {
    try {
        const user = User.find()
        return user
    } catch (error) {
        return res.json({ error: error });
    }
}

export async function registeru(req) {

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.password, salt);
    req.password = hashPassword;
    const user = new User({
        username: req.username,
        email: req.email,
        password: req.password
    });
    const result = await user.save();
    jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    return result
}

export async function loginu(req) {
    const password = req.password
    const userExist = await User.findOne({ username: req.username })
    //Check password match
    const isPasswordMatched = await bcrypt.compare(password, userExist.password)
    if (isPasswordMatched) {
        jwt.sign({ id: userExist._id }, process.env.JWT_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        })
        const result = await User.updateOne({ username: req.username }, { token: true })
        return result
    } return { mesage: "incorrect password" }
}

export async function logint(req) {
    if (req.id.length == 24) {
        const user = await User.findById({ _id: req.id })
        if (user) {
            jwt.sign({ id: user._id }, process.env.JWT_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            })
            const result = await User.updateOne({ _id: req.id }, { token: true })
            return result
        } else {
            return { message: "user does not exist" }
        }
    } else {
        return { message: "invalid ID" }
    }

}

export async function removeUS(req) {
    if (req.id.length == 24) {
        const user = await User.findById({ _id: req.id })
        if (user.token) {
            const result = await User.remove({ _id: req.id })
            return result
        } else {
            return { message: "this operation need autentication" }
        }
    } else {
        return { message: "invalid ID" }
    }
}

export async function updateUS(req1, req2) {
    const { id } = req1
    const { username, email, password } = req2
    if (id.length == 24) {
        const user = await User.findById({ _id: id })
        if (user.token) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const result = await User.updateOne({ _id: id }, {
                $set: {
                    username, email, password: hashPassword
                }
            })
            return result
        } else {
            return { message: "this operation need autentication" }
        }
    } else {
        return { message: "invalid ID" }
    }
}

