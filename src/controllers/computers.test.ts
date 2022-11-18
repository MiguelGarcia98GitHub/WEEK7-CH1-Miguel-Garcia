import { NextFunction, Request, Response } from 'express';

import { ComputersController } from '../controllers/computers.js';
import { ComputersMongoData } from './../data/computersmongodata';

// jest.mock('../data/computersmongodata,js');

describe('Given ComputersController', () => {
    ComputersMongoData.prototype.getAll = jest.fn().mockResolvedValue(['PC1']);
    const repository = new ComputersMongoData();

    const computerController = new ComputersController(repository);
    const req: Partial<Request> = {};
    const resp: Partial<Response> = {
        json: jest.fn(),
    };
    const next: NextFunction = jest.fn();
    test('Then ... getAll', async () => {
        await computerController.getAll(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ computers: ['PC1'] });
    });
});
