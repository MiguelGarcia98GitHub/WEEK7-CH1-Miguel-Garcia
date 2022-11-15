import { Request, Response } from 'express';
import { PhoneController } from './phones';

describe('Given PhoneController', () => {
    const taskController = new PhoneController();
    const req = {};
    const resp = {
        json: jest.fn(),
        end: jest.fn(),
    };
    test('Then ... getAll', () => {
        taskController.getAll(req as Request, resp as unknown as Response);
        expect(resp.json).toHaveBeenCalled();
        expect(resp.end).toHaveBeenCalled();
    });
});

export {};
