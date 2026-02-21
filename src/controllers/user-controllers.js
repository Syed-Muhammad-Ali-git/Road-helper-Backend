import UserModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
const welcomeApiScreen = (req, res) => {
    return res.status(200).send("API Wroking properly")
}

const saveUser = async (req,res) => {
    try {        
        const isFieldsEmpty = Object.values(req.body).some(value => !value);
        
        if (isFieldsEmpty) {   
            return res.status(400).send({
                status: false,
                message: "All fields are required!!!"
            })
        }

        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send({
                status: false,
                message: "User already exists!!!"
            })
        }

        const newUser = new UserModel(req.body);
        await newUser.save();
        return res.status(200).send({
            status: true,
            message: "User saved successfully!!!"
        })
    }
    catch (err){
        return res.status(500).send({
            status: false,
            message: "Internal Server error!!!" + err
        })
    }
}

const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                status: false,
                message: "All fields are required!!!"
            })
        }
        const user = await UserModel.findOne({
            email,
            password
        })
        if (!user) {
            return res.status(404).send({
                status: false,
                message: "User not found!!!"
            })
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role
        }, process.env.SECRET_KEY, { expiresIn: "1h" });
        
        return res.status(200).send({
            status: true,
            message: "User logged in successfully!!!",
            data: user,
            token
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: "Internal Server error!!!"
        })
    }
}
const getAllUser = async (req, res) => {
    try {
        const { name, role, email } = req.query;

        if (req.query) {
            let data = null
            if (role) data = await UserModel.findOne({ role });
            else if (email) data = await UserModel.findOne({ email });
            else if (name) data = await UserModel.findOne({ name });
            else data = await UserModel.find({});
            return res.status(200).send({
                status: true,
                data
            })
        }
        return res.status(200).send({
            status: true,
            data: {}
        });
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: "Internal Server error!!!"
        })
    }
}

export {
    getAllUser,
    saveUser,
    welcomeApiScreen,
    logInUser
}