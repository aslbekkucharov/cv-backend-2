import 'dotenv/config'
import { DataSource } from "typeorm"
import { User } from 'src/users/entities/user.entity'
import { Post } from 'src/posts/entities/post.entity'

const dataSource = new DataSource({
    type: 'postgres',
    entities: [User, Post],
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    migrations: ['dist/src/migrations/*.js'],
})

export default dataSource