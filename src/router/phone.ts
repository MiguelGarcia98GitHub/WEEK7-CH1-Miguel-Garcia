import { Router } from 'express';
import { PhoneController } from '../controllers/phones.js';

export const phoneRouter = Router();

const controller = new PhoneController();

phoneRouter.get('/', controller.getAll);
phoneRouter.get('/:id', controller.get);
phoneRouter.post('/', controller.post);
phoneRouter.patch('/:id', controller.patch);
phoneRouter.delete('/:id', controller.delete);
