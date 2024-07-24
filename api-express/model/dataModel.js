import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Data = db.define('logs', {
    name: DataTypes.STRING,
    img: DataTypes.TEXT,
    timestamp: DataTypes.DATE,
    is_valid: {
        type: DataTypes.ENUM,
        values: ['0', '1'],
        defaultValue: '1'
    }
}, {
    freezeTableName: true
});

export default Data;

(async () => {
    await db.sync();
})();
