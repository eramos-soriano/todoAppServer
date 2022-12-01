// defining a schema, which maps to a MongoDB collection 
// and defines the shape of the documents within that collection.
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// a library to help you hash code
// example: password (plain text) -> bcrypt (hash function) -> hashed password
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,

    },

    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"],
        select: false,
    },

    avatar: {
        public_id: String,
        url: String,
    },

    // from tasks
    createdAt: {
        type: Date,
        default: Date.now,
    },

    tasks: [
        {
            title: "String",
            description: "String",
            completed: Boolean,
            createdAt: Date,
        },
    ],

    verified: {
        type: Boolean,
        default: false,
    },

    otp: Number,
    otp_expiry: Date,
    resetPasswordOtp: Number,
    resetPasswordOtpExpiry: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    // password hash salting
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    });
};
  
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.model("User", userSchema);