import { Router } from "express";

const router = Router();

import { registerUser } from "../../controllers/Auth/user.controller.js";
import { userRegistrationValidator } from "../../validators/Auth/user.validate.js";
import { checkValidationErrors } from "../../validators/validate.js";

router.route('/register')
    .post(
        userRegistrationValidator(),
        checkValidationErrors,
        registerUser
    )


export default router;