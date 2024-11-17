import 'dotenv/config'
import { User } from 'src/users/entities/user.entity'
import { DataSource } from "typeorm"

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [User],
    migrations: ['src/migrations/*.{js,ts'],
})

export default dataSource