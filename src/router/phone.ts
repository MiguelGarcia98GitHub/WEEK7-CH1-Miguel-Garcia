import { Router } from 'express';
import { PhoneController } from '../controllers/phones.js';
import { PhoneFileData } from '../data/phones.file.data.js';

export const phoneRouter = Router();

const controller = new PhoneController(new PhoneFileData());

phoneRouter.get('/', controller.getAll.bind(controller));
// ROUTE TO FIX
// taskRouter.get('/', (req, resp) => controller.getAll(req, resp));
phoneRouter.get('/:name', controller.get.bind(controller));
phoneRouter.post('/', controller.post.bind(controller));
phoneRouter.patch('/:id', controller.patch.bind(controller));
phoneRouter.delete('/:id', controller.delete.bind(controller));
