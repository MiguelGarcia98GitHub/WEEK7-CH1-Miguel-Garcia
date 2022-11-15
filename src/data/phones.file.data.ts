import fs from 'fs/promises';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Phone } from '../interfaces/phone.js';
import { Data } from './data.js';

export class PhoneFileData implements Data<Phone> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = process.env.DATA_FILE || '';
    }

    async getAll(): Promise<any> {
        return fs
            .readFile(this.dataFileURL, 'utf-8')
            .then((data) => JSON.parse(data) as Array<Phone>);
    }

    async get(id: number | undefined): Promise<Phone> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data) as Array<Phone>;
            const item = aData.find((item: any) => item.id === id);
            if (!item) throw new Error();
            return item;
        });
    }

    async post(newPhone: Partial<Phone>): Promise<Phone> {
        const aData = await this.getAll();
        const finalPhone = { ...(newPhone as Phone), id: this.#createID() };
        console.log(aData, 'SOY UN ARRAY?');
        aData.phones.push(finalPhone);
        await this.#saveData(aData);
        return finalPhone;
    }

    async patch(
        id: number | undefined,
        updatePhone: Partial<Phone>
    ): Promise<Phone> {
        const aData = await this.getAll();
        const index = aData.findIndex((item: any) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData[index] = {
            ...aData[index],
            ...updatePhone,
        };
        await this.#saveData(aData);
        return aData[index];
    }

    async delete(id: number | undefined): Promise<void> {
        const aData = await this.getAll();
        const index = aData.findIndex((item: any) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData.filter((item: any) => item.id !== id);
        await this.#saveData(aData);
    }

    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }

    #saveData(data: Array<Phone>) {
        return fs.writeFile(this.dataFileURL, JSON.stringify(data));
    }
}
