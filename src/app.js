import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

app.use(cors({
    origin: process.env.CORS,
    credentials: true,
   
}));

app.use(cookieParser({
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
}));

app.use(express.json({
    limit: '50mb',
}));

app.use(express.urlencoded({
    extended: true,
    limit: '50mb',
}));

app.use(express.static('public'));

import userRouter from './routers/Auth/user.routes.js'

app.use('/api/v1/users', userRouter)

export {app}