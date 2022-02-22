import express, { Application, Request, Response } from 'express'

const app: Application = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async(req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: 'Welcome to URL shortening service'})
})

export default app
