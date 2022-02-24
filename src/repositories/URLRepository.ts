import CacheService from "../services/CacheService";

class URLRepository {

    constructor(private cacheService: CacheService) {
    }

    saveInCache = async (key: string, value: string) => await this.cacheService.setKey(key, value);

    isKeyExistInCache = async (key: string) => await this.cacheService.isKeySet(key);

    getFromCache = async (key: string) => await this.cacheService.getByKey(key);
}

export default URLRepository;
