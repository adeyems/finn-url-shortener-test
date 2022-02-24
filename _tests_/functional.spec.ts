import server from 'supertest'
import app from "../src/app";

const request = () => server(app)


describe('the tests for testing api full functionalities', () => {
    it('should return a 422 Unprocessable Entity Response Code if url object is missing', async done => {
        request()
            .post('/api/v1/encode')
            .expect('Content-Type', /json/)
            .expect(422)

            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({status: "error", message: "URL is required"})
                done()
            })
    })

    it('should return a 422 Unprocessable Entity Response Code', async done => {
        request()
            .post('/api/v1/encode')
            .send({url: "http://localhost:8080"})
            .expect('Content-Type', /json/)
            .expect(422)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({status: "error", message: "URL is invalid"})
                done()
            })
    })

    it('should return a 201 created response and an encoded shortened URL', async done => {
        request()
            .post('/api/v1/encode')
            .send({url: "https://google.com"})
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({status: "success", message: "Encoded URL"})
                expect(res.body.data).toHaveProperty("url", expect.stringMatching(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/))
                done()
            })
    })

    it('should return a 201 created response and the same encoded shortened URL for the same url multiple times', async done => {
        let url = "https://google.com", encodedURL = '';
        request()
            .post('/api/v1/encode')
            .send({url})
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({status: "success", message: "Encoded URL"})
                expect(res.body.data).toHaveProperty("url", expect.stringMatching(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/))

                encodedURL = res.body.data.url.split('/')[3]

                expect(encodedURL.length).toEqual(6)

                done()
            })

        request()
            .post('/api/v1/encode')
            .send({url})
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({status: "success", message: "Encoded URL"})
                expect(res.body.data).toHaveProperty("url", expect.stringMatching(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/))

                expect(res.body.data.url.split('/')[3]).toEqual(encodedURL);

                done()
            })
    })

    it('should return a 201 created response and different encoded shortened URLs using different urls', async done => {
        let url = "https://google.com", url1 = "https://facebook.com",  encodedURL = '';
        request()
            .post('/api/v1/encode')
            .send({url})
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({status: "success", message: "Encoded URL"})
                expect(res.body.data).toHaveProperty("url", expect.stringMatching(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/))

                encodedURL = res.body.data.url.split('/')[3]

                expect(encodedURL.length).toEqual(6)

                done()
            })

        request()
            .post('/api/v1/encode')
            .send({url: url1})
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({status: "success", message: "Encoded URL"})
                expect(res.body.data).toHaveProperty("url", expect.stringMatching(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/))

                expect(res.body.data.url.split('/')[3]).not.toEqual(encodedURL);

                done()
            })
    })
});


