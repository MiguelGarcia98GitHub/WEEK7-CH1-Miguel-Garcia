import { json, NextFunction, Request, Response } from 'express';
import importData from '../mock/data.json';
import { Phone } from '../interfaces/phone';
import fs from 'fs';

// eslint-disable-next-line prefer-const

// const dataFile = process.env.DATA_FILE || '';
// const importData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
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
            id: Math.floor(Math.random() * 10000),
        };

        //

        // const newData = [...data];
        // const newString = JSON.parse(newData.toString());
        // const newArray = newString.toArray();

        // fs.writeFileSync('../mock/data.json', JSON.stringify(newPhone));

        //

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
