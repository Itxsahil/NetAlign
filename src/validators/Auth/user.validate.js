import { body, param } from "express-validator";

const userRegistrationValidator = () => {
    return [
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .bail()
            .isLength({ min: 3, max: 14 })
            .withMessage("Username must be between 3 and 20 characters")
            .isLowercase()
            .withMessage("Username must be lowercase"),
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .bail()
            .isEmail()
            .withMessage("Email must be valid"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .bail()
            .isLength({ min: 6, max: 20 })
            .withMessage("Password must be between 6 and 20 characters")
            .bail()
            .matches(/[a-zA-Z]/)
            .withMessage("Password must contain at least one letter")
            .bail()
            .matches(/[0-9]/)
            .withMessage("Password must contain at least one digit")
            .bail()
            .matches(/[!@#$%^&*]/)
            .withMessage("Password must contain at least one special character"),
    ];
};

const userLoginValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .bail()
            .isEmail()
            .withMessage("Email must be valid"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .bail()
            .isLength({ min: 6, max: 20 })
            .withMessage("Password must be between 6 and 20 characters")
            .bail()
            .matches(/[a-zA-Z]/)
            .withMessage("Password must contain at least one letter")
            .bail()
            .matches(/[0-9]/)
            .withMessage("Password must contain at least one digit")
            .bail()
            .matches(/[!@#$%^&*]/)
            .withMessage("Password must contain at least one special character"),
    ];
}


export {
    userRegistrationValidator,
    userLoginValidator,
}