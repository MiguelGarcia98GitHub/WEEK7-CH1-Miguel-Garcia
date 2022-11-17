import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { Computer } from '../interfaces/computer.js';
import { HTTPError } from '../interfaces/error.js';

export class ComputersController {
    constructor(public repository: Data<Computer>) {}

    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            const computers = await this.repository.getAll();
            resp.json({ computers });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const computer = await this.repository.get(req.params.id);
            resp.json({ computer });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    async post(req: Request, resp: Response, next: NextFunction) {
        try {
            const computer = await this.repository.post(req.body);
            resp.json({ computer });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const computer = await this.repository.patch(
                req.params.id,
                req.body
            );
            resp.json({ computer });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.repository.delete(req.params.id);
            resp.json({});
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }

    #createHttpError(error: Error) {
        if (error.message === 'Not found id') {
            const httpError = new HTTPError(404, 'Not Found', error.message);
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            error.message
        );
        return httpError;
    }
}
