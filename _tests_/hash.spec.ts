import Hashing from "../src/services/Hashing";
describe('the tests for validating hash function', () => {
    it('should return a six digit hashed character', async done => {
        const string = 'http://facebook.com';
        const encodedString = (new Hashing).encode(string);

        expect(encodedString).toHaveLength(6);
    })
});
