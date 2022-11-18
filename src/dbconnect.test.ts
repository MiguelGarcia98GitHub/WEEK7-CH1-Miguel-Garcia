import { dbConnect } from './dbconnect';
import mongoose from 'mongoose';

test('Should be able to connect to the DB', async () => {
    const result = await dbConnect();
    expect(typeof result).toBe(typeof mongoose);
    mongoose.disconnect();
});
