import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "./utils/logger.js";
import morgan from "morgan";
const app = express();

app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);
const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(
  cookieParser({
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  })
);

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(express.static("public"));

import healthRouter from "./routers/healthcheck/healthcheck.routes.js";
import userRouter from "./routers/Auth/user.routes.js";

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/users", userRouter);

export { app };
