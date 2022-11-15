import { Phone } from '../interfaces/phone';
import { Data } from './data';
import fs from 'fs';

export class fileData implements Data {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = process.env.DATA_FILE || '';
    }

    async getAll() {
        return fs
            .readFile(this.dataFileURL, 'utf-8')
            .then((data: string) => JSON.parse(data) as Array<Phone>);
    }
}
