import { Sequelize } from "sequelize";

const db = new Sequelize ('db_face_recognition', 'tino', 'training2024', {
    host: 'connectis.my.id',
    dialect: 'mysql'
}) 

async function testConnection() {
    try {
        await db.authenticate()
        console.log('database already connected')
    } catch {
        console.error('Cant connect to database: ', error)
    }
}

export default db