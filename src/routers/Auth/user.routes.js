import { Router } from "express";

const router = Router();

import {
    registerUser,
    loginUser,
} from "../../controllers/Auth/user.controller.js";
import { 
    userRegistrationValidator,
    userLoginValidator 
} from "../../validators/Auth/user.validate.js";
import { checkValidationErrors } from "../../validators/validate.js";

router.route('/register').post(userRegistrationValidator(),checkValidationErrors,registerUser)

router.route('/login').post(userLoginValidator(),checkValidationErrors,loginUser)

export default router;