import _Sequelize from "sequelize";
const { Sequelize } = _Sequelize;
import { DATABASE_PATH } from "./paths.js";
const sequelize = new Sequelize({
    dialect: "sqlite",
    logging: false,
    storage: DATABASE_PATH
});
export { sequelize };
