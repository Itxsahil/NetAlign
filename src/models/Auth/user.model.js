import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const userSchema = new Schema(
    {
        avatar: {
            type: String,
            required: true,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8k-tX8qtD1frfF8PtTSgoLQFCJJSNI5Va0g&s"
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String
        },
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpires: {
            type: Date
        },
        emailVerificationToken: {
            type: String
        },
        emailVerificationExpires: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (req, res, next) {
    if (!this.isModified('password')) return ;
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateTemporaryToken = function () {
	// This token should be client facing
	// for example: for email verification unHashedToken should go into the user's mail
	const unHashedToken = crypto.randomBytes(20).toString("hex");

	// This should stay in the DB to compare at the time of verification
	const hashedToken = crypto
		.createHash("sha256")
		.update(unHashedToken)
		.digest("hex");
	// This is the expiry time for the token (20 minutes)
	const tokenExpiry = Date.now() + 200000;

	return { unHashedToken, hashedToken, tokenExpiry };
}

export const User = mongoose.model('User', userSchema);