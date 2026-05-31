import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    profilePicture: { type: String, default: null },
    role: { type: String, required: true, default: 'client' },
    createdAt: { type: Date, default: Date.now() }
});

const User = mongoose.model("User", userSchema);

export default User;