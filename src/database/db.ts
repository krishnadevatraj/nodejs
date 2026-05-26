import { Kysely, PostgresDialect } from "kysely";
import { schema } from "./schema";
import pg from "pg";
const pool = new pg.Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
});

export default new Kysely<schema>({
  dialect: new PostgresDialect({
    pool,
  }),
});
