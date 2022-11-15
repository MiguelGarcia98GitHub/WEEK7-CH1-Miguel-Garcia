import { Phone } from '../interfaces/phone';

export interface Data<Phone> {
    getAll: () => Promise<Array<Phone>>;
    get: (id: number | undefined) => Promise<Phone>;
    post: (data: Partial<Phone>) => Promise<Phone>;
    patch: (id: number | undefined, data: Partial<Phone>) => Promise<Phone>;
    delete: (id: number | undefined) => Promise<void>;
}
