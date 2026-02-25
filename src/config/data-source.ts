import { DataSource } from "typeorm"
import { env } from "./env.js"
import { User } from "../entities/User.entity.js"
import { RefreshToken } from "../entities/RefreshToken.entity.js"

export const AppDataSource = new DataSource({
  type: "postgres",

  host: env.DB_HOST,
  port: 5432,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,

  entities: [User, RefreshToken],

  synchronize: env.NODE_ENV === "development",
  logging: env.NODE_ENV === "development",
})