import bodyParser from "body-parser";
import Express from "express";
import session from "express-session";
import compression from "compression";
import { apiRouter } from "./routes/api.js";
import { staticRouter } from "./routes/static.js";
const app = Express();
app.keepAliveTimeout = 30 * 1000;
app.set("trust proxy", true);
app.use(compression());
app.use(
    session({
        proxy: true,
        resave: false,
        saveUninitialized: false,
        secret: "poales-queak-ree-crin-carisa-tiler-frijol"
    })
);
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: "10mb" }));
app.use("/api/v1", apiRouter);
app.use(staticRouter);
export { app };
