import {NextFunction, Request, Response} from "express";
import {errorResponse, responseCode} from "../utils/response";
import URLService from "../services/URLService";

export const isUrlValid = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.url)
        return errorResponse(res, responseCode.UNPROCESSABLE_ENTITY, 'URL is required')

    if (!URLService.isValidURL(req.body.url))
        return errorResponse(res, responseCode.UNPROCESSABLE_ENTITY, 'URL is invalid')

    next();
}
