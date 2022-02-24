import {NextFunction, Request, Response} from "express";
import {errorResponse, responseCode} from "../utils/response";

export const isPathKeyValid = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.path)
        return errorResponse(res, responseCode.UNPROCESSABLE_ENTITY, 'Path is required')

    if (req.body.path.length !== 6)
        return errorResponse(res, responseCode.UNPROCESSABLE_ENTITY, 'Invalid URL')

    next();
}
