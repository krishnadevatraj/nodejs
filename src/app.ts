import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import auth_routes from './modules/auth/auth.routes';
import employee_routes from './modules/emp/emp.routes';
import collection_routes from './modules/collection/collection.routes';
import media_routes from './modules/media/media.route';
// import { rateLimiter } from "./middleware/rateLimiter";
import { errorMessage } from './middleware/errorMessage.middleware';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_BASE_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(rateLimiter);
app.use('/', (req, res) => {
    res.send('Server is running');
});
app.use('/api', auth_routes);
app.use('/api', employee_routes);
app.use('/api', collection_routes);
app.use('/api', media_routes);
app.use(errorMessage);

export default app;
