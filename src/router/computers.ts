import { Router } from 'express';
import { ComputersController } from '../controllers/computers.js';
import { ComputersMongoData } from '../data/computersmongodata.js';

export const computersRouter = Router();

const controller = new ComputersController(new ComputersMongoData());
console.log(controller);

computersRouter.get('/', controller.getAll.bind(controller));
computersRouter.get('/:id', controller.get.bind(controller));
computersRouter.post('/', controller.post.bind(controller));
computersRouter.patch('/:id', controller.patch.bind(controller));
computersRouter.delete('/:id', controller.delete.bind(controller));
