import {NextFunction, Request, Response} from "express";

export const encodeToUtf8 = (req: Request, res: Response, next: NextFunction) => {
    req.body.url = Buffer.from(req.body.url, 'utf-8').toString();

    next();
}
