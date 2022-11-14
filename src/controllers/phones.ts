import { NextFunction, Request, Response } from 'express';
import importData from '../mock/data.json' assert { type: 'json' };
import { Phone } from '../interfaces/phone';

// eslint-disable-next-line prefer-const
let data: Array<Phone> = importData.phones;

export class PhoneController {
    getAll(req: Request, resp: Response) {
        resp.json(data);
        resp.end();
    }

    get(req: Request, resp: Response, next: NextFunction) {
        if (!data.find((item) => item.id === +req.params.id)) {
            next(new Error('Not found'));
            return;
        }
        console.log(req.body);
        const getItem = data.filter((item) => item.id === +req.params.id);
        resp.json(getItem);
        resp.end();
    }

    post(req: Request, resp: Response) {
        const newPhone = {
            ...req.body,
            id: data.length + 1,
        };
        data.push(newPhone);
        resp.json(newPhone);
        resp.end();
    }

    patch(req: Request, resp: Response) {
        const updatePhone = {
            ...data.find((item) => item.id === +req.params.id),
            ...req.body,
        };
        data[data.findIndex((item) => item.id === +req.params.id)] =
            updatePhone;
        resp.json(updatePhone);
        resp.end();
    }

    delete(req: Request, resp: Response, next: NextFunction) {
        if (!data.find((item) => item.id === +req.params.id)) {
            next(new Error('Not found'));
            return;
        }
        data = data.filter((item) => item.id !== +req.params.id);
        resp.json({});
        resp.end();
    }
}
