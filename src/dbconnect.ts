import mongoose from 'mongoose';
import { CLUSTER, PASS, USER } from './config';

export function dbConnect() {
    const DBName =
        process.env.NODE_ENV !== 'test' ? 'ComputerDB' : 'ComputerDBTesting';
    const uri = `mongodb+srv://${USER}:${PASS}@${CLUSTER}/${DBName}?retryWrites=true&w=majority`;
    return mongoose.connect(uri);
}
