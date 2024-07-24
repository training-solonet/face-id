import { Sequelize } from "sequelize";

const db = new Sequelize ('db_face_recognition', 'tino', 'training2024', {
    host: 'connectis.my.id',
    dialect: 'mysql'
})

export default db