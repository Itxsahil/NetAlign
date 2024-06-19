import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { User } from '../../models/Auth/user.model.js'
import { sendEmail } from '../../utils/nodemailer.js';
import { generateVerificationHtml, generateVerificationText } from '../../utils/emailGenerator.js';




const registerUser = asyncHandler(async(req, res)=>{
    const { username, password, email, } = req.body;
    
    const userExists = await User.findOne({
        $or: [{ username}, {email}],
    })

    if (userExists) {
        throw new ApiError(409, 'User already exists')
    }

    const user = await User.create({
        username,
        password,
        email,
        isEmailVarified: false,
    })

    if(!user){
        throw new ApiError(500, 'Something went wrong while creating the user please try again later')
    }

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()

    user.emailVarificationToken = hashedToken;
    user.emailVarificationExpires = tokenExpiry;
    user.save({ validateBeforeSave: false})

    const verificationUrl = `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`;
    const subject = `please verify your email ${username}`;
    const html = generateVerificationHtml(username, verificationUrl);
    const text = generateVerificationText(username, verificationUrl);
    await sendEmail(email, subject, html, text);
    const createdUser = await User.findById(user._id)
                        .select("-password -emailVarificationExpires -emailVarificationToken -isEmailVarified -resetPasswordExpires -resetPasswordToken -refreshToken")

    if(!createdUser){
        throw new ApiError(404, 'User not found')
    }

    return res.status(201).json(new ApiResponse(
        201,
        {data: createdUser},
        "User created successfully and the varification mail is sent successfully please check your mail box"
    ))
})

export {
    registerUser,
}