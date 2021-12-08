import Router from "express-promise-router";
import { insertSeeds } from "../../seeds.js";
import { sequelize } from "../../sequelize.js";
const router = Router();
router.post("/initialize", async (_req, res) => {
    await sequelize.sync({
        force: true,
        logging: false
    });
    await insertSeeds();
    return res.status(200).type("application/json").send({});
});
export { router as initializeRouter };
