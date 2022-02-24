import server from 'supertest'
import app from "../src/app";

const request = () => server(app)


describe('the tests for testing decoding endpoint functionalities', () => {
    it('should return a 422 Unprocessable Entity Response Code if path key is missing', async done => {
        request()
            .post('/api/v1/decode')
            .expect('Content-Type', /json/)
            .expect(422)

            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({status: "error", message: "URL is required"})
                done()
            })
    })

    it('should return a 200 success response and a decoded URL', async () => {
        let url = "https://google.com", encodedPath = '';
        let res = await request()
            .post('/api/v1/encode')
            .send({url})
            .expect('Content-Type', /json/)

        expect(res.status).toEqual(201)
        expect(res.body).toMatchObject({status: "success", message: "Encoded URL"})
        expect(res.body.data).toHaveProperty("url", expect.stringMatching(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/))

        encodedPath = res.body.data.url.split('/')[3]

        expect(encodedPath.length).toEqual(6)


        res = await request()
            .post('/api/v1/decode')
            .send({path: encodedPath})
            .expect('Content-Type', /json/)


        expect(res.status).toEqual(200)
        expect(res.body).toMatchObject({status: "success", message: "Decoded URL"})
        expect(res.body.data.url).toMatch(url);
    })

    it('should return a 404 not found response when a random URL is sent', async () => {
        let res = await request()
            .post('/api/v1/decode')
            .send({path: '45ff5554'})
            .expect('Content-Type', /json/)

        expect(res.status).toEqual(404)
        expect(res.body).toMatchObject({status: "error", message: "URL not found"})
    })
});


