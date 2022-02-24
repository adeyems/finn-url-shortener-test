import HelperService from "../src/services/HelperService";
describe('the tests for validating hash function', () => {
    it('should return a six digit character', async done => {
        const randomString = (new HelperService).generateRandomString(6);

        expect(randomString).toHaveLength(6);

        done()
    })
});
