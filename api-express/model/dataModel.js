import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Data = db.define('log', {
    name: DataTypes.STRING,
    img: DataTypes.TEXT,
    timestamp: DataTypes.DATE,
    is_valid: {
        type: DataTypes.ENUM,
        values: ['0', '1'],
        defaultValue: 'false'
    }
}, {
    freezeTableName: true
});

export default Data;

(async () => {
    await db.sync();
})();
