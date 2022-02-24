"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HelperService_1 = __importDefault(require("../src/services/HelperService"));
describe('the tests for validating hash function', () => {
    it('should return a six digit character', async (done) => {
        const randomString = (new HelperService_1.default).generateRandomString(6);
        expect(randomString).toHaveLength(6);
        done();
    });
});
