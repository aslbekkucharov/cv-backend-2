import { configDotenv } from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm"

import { User } from "@/users/entities/user.entity"

configDotenv()

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT!,
    username: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    entities: [User],
    migrations: [`${__dirname}/../migrations/*.{ts,js}`],
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource