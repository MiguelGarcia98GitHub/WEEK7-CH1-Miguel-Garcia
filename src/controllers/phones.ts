import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { HTTPError } from '../interfaces/error.js';
import { Phone } from '../interfaces/phone.js';
import { Document, MongoClient, WithId } from 'mongodb';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: '../../.env' });
import mongoose, { model } from 'mongoose';

export class PhoneController {
    constructor(public dataModel: Data<Phone>) {}
    async getAll(_req: Request, resp: Response, next: NextFunction) {
        const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSW}@${process.env.CLUSTER}/test/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('test');
        const coll = db.collection('tasks');
        const cursor = coll.find();
        const newCursor: WithId<Document>[] = [];
        await cursor.forEach((item) => {
            console.log(item);
            newCursor.push(item);
        });
        await client.close();
        resp.json(newCursor).end();
    }

    async get(req: Request, resp: Response) {
        const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSW}@${process.env.CLUSTER}/test/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('test');
        const coll = db.collection('tasks');
        const singleGetData = await coll.findOne({ name: req.params.name });
        await client.close();
        resp.json(singleGetData).end();
    }

    async post(req: Request, resp: Response, next: NextFunction) {
        console.log(req.body);

        const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSW}@${process.env.CLUSTER}/?retryWrites=true&w=majority`;

        const taskSchema = new mongoose.Schema({
            name: mongoose.SchemaTypes.String,
            RAM: String,
            id: Number,
        });

        const connector = await mongoose.connect(uri);

        const Task = model('Task', taskSchema, 'tasks');

        await Task.create({
            ...req.body,
        });

        connector.disconnect();

        resp.json({ ...req.body }).end();
    }

    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const updatePhone = await this.dataModel.patch(
                +req.params.id,
                req.body
            );
            resp.json(updatePhone).end();
        } catch (error) {
            if ((error as Error).message === 'Not found id') {
                const httpError = new HTTPError(
                    404,
                    'Not Found',
                    (error as Error).message
                );
                next(httpError);
                return;
            }
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.dataModel.delete(+req.params.id);
            resp.json({}).end();
        } catch (error) {
            if ((error as Error).message === 'Not found id') {
                const httpError = new HTTPError(
                    404,
                    'Not Found',
                    (error as Error).message
                );
                next(httpError);
                return;
            }
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }
}
