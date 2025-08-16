import bcrypt from 'bcrypt'
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        email:{
            type: String,
            required: [true, "Email is required"],
            unique: [true, "ALready registered"],
            lowercase: true, // Converts email to lowercase before saving
            trim: true, // Removes whitespace from both ends of the string
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            ]
        },
        password: {
            type: String,
            required: [true, "password is required"],
            maxLen: 20
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: [true, "This uername is already taken"],
            match: [
                /^[a-zA-Z0-9]+$/,
                'username only contain number and alphabets'
            ],
            minLength: [3, 'Username should be at least of 3 character']
        },
        avatar: {
            type: String,

        }
    },
    { timeStamps: true}
);

userSchema.pre('save', function saveUser(next) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = hashedPassword;
    user.avatar = `https://robohash.org/${user.username}`;
    next();
})

const User = mongoose.model('User', userSchema);
export default User;