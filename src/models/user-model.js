import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["helper", "customer"],
        default: "customer"
    },
    address: {
        type: String,
        default: null
    }

}, {
    timestamps: true,
    collation: "users"
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;