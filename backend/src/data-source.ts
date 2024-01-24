import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "87.106.122.236",
    port: 3306,
    username: "clmt",
    password: "130702",
    database: "fighterStats",
    synchronize: true,
    logging: false,
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ['migrations/**/*{.ts,.js}'],
    subscribers: [],
})
