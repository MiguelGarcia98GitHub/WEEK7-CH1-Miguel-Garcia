import { CustomError, HTTPError } from './error.js';

describe('Given', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let error: CustomError;
    beforeEach(() => {
        error = new HTTPError(420, 'Big Smoke', 'Dont miss the train CJ');
    });
    test('should first', () => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('statusCode', 420);
        expect(error).toHaveProperty('statusMessage', 'Big Smoke');
        expect(error).toHaveProperty('message', 'Dont miss the train CJ');
        expect(error).toHaveProperty('name', 'HTTPError');
    });
});
