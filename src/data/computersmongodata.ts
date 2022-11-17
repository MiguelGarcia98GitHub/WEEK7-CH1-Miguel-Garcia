import mongoose, { model, Schema } from 'mongoose';
import { Data, id } from './data.js';
import { ProtoComputer, Computer } from '../interfaces/computer.js';

export class ComputersMongoData implements Data<Computer> {
    #schema = new Schema({
        name: String,
        RAM: String,
    });

    #Model = model('Computer', this.#schema, 'computers');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        });
    }

    async getAll(): Promise<Array<Computer>> {
        return this.#Model.find();
    }

    async get(id: id): Promise<Computer> {
        const result = await this.#Model.findById(id);
        if (!result) throw new Error('Not found id');
        return result as Computer;
    }

    async post(data: ProtoComputer): Promise<Computer> {
        const result = await this.#Model.create(data);
        return result as Computer;
    }

    async patch(id: id, data: Partial<Computer>) {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result as Computer;
    }

    async delete(id: id): Promise<void> {
        const result = await this.#Model.findByIdAndDelete(id);
        if (result === null) throw new Error('Not found id');
        return;
    }

    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }
}
