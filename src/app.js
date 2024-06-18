import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

app.use(cors({
    origin: process.env.CORS,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type,Authorization,X-Requested-With',
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

export {app}