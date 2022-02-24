import {config} from "./config";
import app from "./app";
import cluster, {isMaster} from "cluster";
import {cpus} from "os";

if (isMaster){
    const numberOfWorkers = cpus().length;

    for (let i = 0; i < numberOfWorkers; i++){
        cluster.fork();
    }

    cluster.on('online', worker => console.info(`Worker ${worker.process.pid} is online`));

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
        console.info('Starting a new worker ...')
        cluster.fork();
    });
}
else app.listen(config.PORT, () => console.info('App running at port ' + config.PORT));
