import { Response } from "express";

export const responseCode = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    ACCOUNT_NOT_VERIFIED: 209,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOW: 405,
    UNSUPPORTED_MEDIA_TYPE: 415,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500
};

export const successResponse = (res: Response, statusCode: number = responseCode.SUCCESS, message: string = 'success', data: any = null) =>
{
    data ? res
        .header({'Content-type': 'application.json'})
        .status(statusCode).json({status: 'success', message, data})

        : res
            .header({'Content-Type': 'application/json'})
            .status(statusCode).json({status: 'success', message})
};

/**
 *
 * @param res
 * @param statusCode
 * @param message
 */
export const errorResponse = (res: Response, statusCode: number = responseCode.INTERNAL_SERVER_ERROR, message: any = 'an error occurred') =>
{
    res.status(statusCode).json({
        status: 'error',
        message,
    });
};
