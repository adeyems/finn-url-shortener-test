import URLRepository from "../repositories/URLRepository";
import {Request, Response} from "express";
import HelperService from "../services/HelperService";
import {errorResponse, responseCode, successResponse} from "../utils/response";

class URLControllers {

    constructor(private helperService: HelperService, private urlRepository: URLRepository) {}

    encode = async (req: Request, res: Response) => {
        try {
            const urlShortCode = await this.urlRepository.getFromCache(req.body.url);
            if (!!urlShortCode)
                return successResponse(res, responseCode.CREATED, 'Encoded URL', {url: `${req.protocol}://${req.get('host')}/${urlShortCode}`})

            let encodedURL =  '', isKeyExist = true;
            while (isKeyExist){
                encodedURL = this.helperService.generateRandomString(6);
                if (!await this.urlRepository.isKeyExistInCache(encodedURL))
                    isKeyExist = false;
            }

            await this.urlRepository.saveInCache(encodedURL, req.body.url)
            await this.urlRepository.saveInCache(req.body.url, encodedURL)

            return successResponse(res, responseCode.CREATED, 'Encoded URL', {url: `${req.protocol}://${req.get('host')}/${encodedURL}`})

        }
        catch (error){
            return errorResponse(res, responseCode.INTERNAL_SERVER_ERROR, 'An error occurred')
        }
    }

    decode = async (req: Request, res: Response) => {

    }
}

export default URLControllers
