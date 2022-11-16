import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { HTTPError } from '../interfaces/error.js';
import { Phone } from '../interfaces/phone.js';

export class PhoneController {
    constructor(public dataModel: Data<Phone>) {}
    async getAll(_req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.getAll();
            resp.json(data).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }

    async get(req: Request, resp: Response) {
        // GET IMPLEMENTATION
        try {
            const getSinglePhone = await this.dataModel.get(+req.params.id);
            resp.json(getSinglePhone).end();
        } catch {
            console.log('error');
        }
    }

    async post(req: Request, resp: Response, next: NextFunction) {
        if (!req.body.name || !req.body.RAM) {
            const httpError = new HTTPError(
                406,
                'Not Acceptable',
                'name or RAM parameters not available in your request'
            );
            next(httpError);
            return;
        }
        try {
            const newPhone = await this.dataModel.post(req.body);
            resp.json(newPhone).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
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
