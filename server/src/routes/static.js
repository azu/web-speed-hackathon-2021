import history from "connect-history-api-fallback";
import Router from "express-promise-router";
import staticServe from "serve-static";
import expressStaticGzip from "express-static-gzip";
import { CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH } from "../paths";

const IS_DEV = process.env.NODE_ENV !== "production";
const router = Router();

// SPA 対応のため、ファイルが存在しないときに index.html を返す
router.use(history());

router.use(
    IS_DEV
        ? staticServe(UPLOAD_PATH)
        : expressStaticGzip(UPLOAD_PATH, {
              enableBrotli: true,
              serveStatic: {
                  etag: true,
                  lastModified: true,
                  immutable: true,
                  maxAge: 3600 * 1000
              }
          })
);

router.use(
    IS_DEV
        ? staticServe(PUBLIC_PATH)
        : expressStaticGzip(PUBLIC_PATH, {
              enableBrotli: true,
              serveStatic: {
                  etag: true,
                  lastModified: true,
                  immutable: true,
                  maxAge: 3600 * 1000
              }
          })
);

router.use(
    IS_DEV
        ? staticServe(CLIENT_DIST_PATH)
        : expressStaticGzip(CLIENT_DIST_PATH, {
              enableBrotli: true,
              serveStatic: {
                  etag: true,
                  lastModified: true,
                  immutable: true,
                  maxAge: 3600 * 1000
              }
          })
);

export { router as staticRouter };
