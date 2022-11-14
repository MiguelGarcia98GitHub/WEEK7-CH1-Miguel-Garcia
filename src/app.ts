import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { phoneRouter } from './router/phone.js';

export const app = express();
// let data: Array<Task> = importData.tasks;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use((_req, _resp, next) => {
    console.log('Middleware');
    next();
});

app.get('/', (req, res) => {
    res.send('Express API - Phones');
    res.end();
});

app.use('/phones', phoneRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, _req: Request, resp: Response, next: NextFunction) => {
    console.log(error.message);
    let status = 500;
    if (error.name === 'ValidationError') {
        status = 406;
    } else {
        //
    }
    resp.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.json(result);
    resp.end();
});
