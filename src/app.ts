import express, { Application, Request, Response } from 'express'
import indexRoutes from './routes'

const app: Application = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async(req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: 'Welcome to URL shortening service'})
})

app.use('/api/v1', indexRoutes);

export default app
