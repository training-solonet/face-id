import { Sequelize } from "sequelize";
import db from "../config/Database";

const { DataTypes } = Sequelize;

const Data = db.define('logs', {
    name: DataTypes.STRING,
    img: DataTypes.BLOB,
    timestamp: DataTypes.DATE,
    is_valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true
});

export default  Data;

(async () => {
    await db.sync();
})();