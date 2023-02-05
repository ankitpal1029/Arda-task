import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();

const HOST = process.env.DB_HOST as string;
const PORT = parseInt(process.env.DB_PORT as string);
const USER = process.env.DB_USER_ as string;
const PASSWORD = process.env.DB_PASSWORD_ as string;
const DATABASE = process.env.DB_DATABASE_ as string;

console.log(HOST, PORT, USER, PASSWORD, DATABASE);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: HOST,
      port: PORT,
      // user: USER,
      user: USER,
      // password: PASSWORD,
      password: PASSWORD,
      database: DATABASE,
      ssl: true,
    },
  },
  staging: {
    client: "pg",
    connection: {
      host: HOST,
      port: PORT,
      // user: USER,
      user: USER,
      // password: PASSWORD,
      password: PASSWORD,
      database: DATABASE,
      ssl: true,
    },
  },
  production: {
    client: "pg",
    connection: {
      host: HOST,
      port: PORT,
      // user: USER,
      user: USER,
      // password: PASSWORD,
      password: PASSWORD,
      database: DATABASE,
      ssl: true,
    },
  },
};

// module.exports = config;
export default config;
// export { config };
