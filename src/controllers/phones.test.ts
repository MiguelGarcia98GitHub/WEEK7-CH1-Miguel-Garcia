import { Request, Response, NextFunction } from 'express';
import { PhoneFileData } from '../data/phones.file.data';
import { PhoneController } from './phones';

describe('Given TaskController', () => {
    const model = new PhoneFileData();
    const taskController = new PhoneController(model);
    const req = {};
    const resp = {
        json: jest.fn(),
        end: jest.fn(),
    };
    const next = {};

    test('Then ... getAll', () => {
        taskController.getAll(
            req as Request,
            resp as unknown as Response,
            next as unknown as NextFunction
        );
        expect(taskController).toBe({});
        // expect(resp.json).toHaveBeenCalled();
        // expect(resp.end).toHaveBeenCalled();
    });
});
