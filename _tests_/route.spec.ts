import server from 'supertest'
import app from "../src/app";

const request = () => server(app)


describe('the tests for validating routes', () => {
    it('should return HTTP response code of 201', async done => {
        request()
            .post('/api/v1/encode')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err)
                done()
            })
    })

    it('should return HTTP response code of 200', async done => {
        request()
            .get('/api/v1/decode')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err)
                done()
            })
    })
});


