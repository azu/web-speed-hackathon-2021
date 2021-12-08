import _Sequelize from "sequelize";
const { DataTypes, Sequelize } = _Sequelize;
import { sequelize } from "../sequelize.js";
/**
 * @typedef {object} MovieAttributes
 * @property {string} id
 */
/**
 * @typedef {import('sequelize').Model<MovieAttributes>} MovieModel
 */
/** @type {import('sequelize').ModelCtor<MovieModel>} */
const Movie = sequelize.define("Movie", {
    id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
    }
});
export { Movie };
