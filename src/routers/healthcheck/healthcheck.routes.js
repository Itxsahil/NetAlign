import { Router } from "express";

const router = Router();

import { healthcheck } from "../../controllers/healthcheck/healthcheck.controller.js";

router.route("/healthcheck").get(healthcheck);

export default router;
