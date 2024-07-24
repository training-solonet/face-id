import { Sequelize } from "sequelize";

const db = new Sequelize ('face_recognition_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db