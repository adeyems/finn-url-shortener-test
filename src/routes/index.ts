import express, {Request, Response} from "express";
import {responseCode, successResponse} from "../utils/response";

const indexRoutes = express.Router();

indexRoutes.post('/encode', (req: Request, res: Response) => successResponse(res, responseCode.CREATED));
indexRoutes.get('/decode', (req: Request, res: Response) => successResponse(res));

export default indexRoutes;
