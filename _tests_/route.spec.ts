import server from 'supertest'
import app from "../src/app";

const request = () => server(app)


describe('the test for validating routes', () => {
    it('should return 200', async done => {
        request()
            .get('/api/v1/encode')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    })

    it('should return 200', async done => {
        request()
            .get('/api/v1/decode')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    })
});


