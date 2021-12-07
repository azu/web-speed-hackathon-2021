import history from "connect-history-api-fallback";
import Router from "express-promise-router";
import expressStaticGzip from "express-static-gzip";
import { CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH } from "../paths";

const router = Router();

// SPA 対応のため、ファイルが存在しないときに index.html を返す
router.use(history());

router.use(
    expressStaticGzip(UPLOAD_PATH, {
        enableBrotli: true,
        serveStatic: {
            etag: true,
            lastModified: true,
            immutable: true,
            maxAge: 36 * 1000 * 10
        }
    })
);

router.use(
    expressStaticGzip(PUBLIC_PATH, {
        enableBrotli: true,
        serveStatic: {
            etag: true,
            lastModified: true,
            immutable: true,
            maxAge: 36 * 1000 * 10,
            cacheControl: false
        }
    })
);

router.use(
    expressStaticGzip(CLIENT_DIST_PATH, {
        enableBrotli: true,
        serveStatic: {
            etag: true,
            lastModified: true,
            immutable: true,
            maxAge: 36 * 1000 * 10
        }
    })
);

export { router as staticRouter };
