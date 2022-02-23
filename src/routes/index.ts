import express, {Request, Response} from "express";
import {responseCode, successResponse} from "../utils/response";
import URLControllers from "../controllers/URLControllers";
import URLRepository from "../repositories/URLRepository";
import {encodeToUtf8} from "../middlewares/encode-to-utf-8";

const indexRoutes = express.Router();

const urlController = new URLControllers(new URLRepository);

indexRoutes.post('/encode', (req: Request, res: Response) => successResponse(res));
indexRoutes.get('/decode', (req: Request, res: Response) => successResponse(res));

export default indexRoutes;
