import {config} from "./config";
import app from "./app";

app.listen(config.PORT, () => console.info('App running at port ' + config.PORT));


