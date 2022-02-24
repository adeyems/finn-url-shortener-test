"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const request = () => supertest_1.default(app_1.default);
describe('the tests for testing api full functionalities', () => {
    it('should return a 422 Unprocessable Entity Response Code if url object is missing', async (done) => {
        request()
            .post('/api/v1/encode')
            .expect('Content-Type', /json/)
            .expect(422)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body).toMatchObject({ status: "error", message: "URL is required" });
            done();
        });
    });
    it('should return a 422 Unprocessable Entity Response Code', async (done) => {
        request()
            .post('/api/v1/encode')
            .send({ url: "http://localhost:8080" })
            .expect('Content-Type', /json/)
            .expect(422)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body).toMatchObject({ status: "error", message: "URL is invalid" });
            done();
        });
    });
    it('should return a 201 created response and an encoded shortened URL', async (done) => {
        request()
            .post('/api/v1/encode')
            .send({ url: "https://google.com" })
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body).toMatchObject({ status: "success", message: "Encoded URL" });
            expect(res.body.data).toHaveProperty("url", expect.stringMatching(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/));
            done();
        });
    });
    it('should return a 201 created response and an encoded shortened URL', async (done) => {
        request()
            .post('/api/v1/encode')
            .send({ url: "https://google.com" })
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body).toMatchObject({ status: "success", message: "Encoded URL" });
            expect(res.body.data).toHaveProperty("url", expect.stringMatching(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/));
            expect(res.body.data.url.split('/')[3].length).toEqual(6);
            done();
        });
    });
});