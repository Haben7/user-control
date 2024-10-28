import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Merchant', 'Admin', 'SuperAdmin'],
    }
}, { timestamps: true });

const usermodel = mongoose.model('user', userSchema);
export default usermodel;
