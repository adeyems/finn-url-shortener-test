"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hashing_1 = __importDefault(require("../src/services/Hashing"));
describe('the tests for validating hash function', () => {
    it('should return a six digit hashed character', async (done) => {
        const string = 'http://facebook.com';
        const encodedString = (new Hashing_1.default).generateRandomString(6);
        expect(encodedString).toHaveLength(6);
    });
});
