import { createClient } from 'redis';

class CacheService {
    private client: any;

    constructor() {
        const run = (async () => {
            this.client = createClient();
            this.client.on('error', (err: any) => console.log('Redis Client Error', err));

            await this.client.connect();
        });

        run();
    }

    setKey = async (key: string, value: string) => this.client.set(key, value, this.client.print)

    getByKey = async (key: string) => await this.client.get(key);

    removeKey = async (key:string) => await this.client.del(key);

    isKeySet = (key: string) => this.client.exists(key, (err: any, reply: any) => reply === 1);
}

export default CacheService;
