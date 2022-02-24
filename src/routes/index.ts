import express from "express";
import URLControllers from "../controllers/URLControllers";
import URLRepository from "../repositories/URLRepository";
import CacheService from "../services/CacheService";
import {isUrlValid} from "../middlewares/is-url-valid";
import HelperService from "../services/HelperService";

const indexRoutes = express.Router();

const urlController = new URLControllers(new HelperService, new URLRepository(new CacheService));

indexRoutes.post('/encode', isUrlValid, urlController.encode);
indexRoutes.get('/decode', urlController.decode);

export default indexRoutes;
