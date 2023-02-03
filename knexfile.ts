import type { Knex } from "knex";

const HOST = process.env.DB_HOST as string;
const PORT = parseInt(process.env.DB_PORT as string);
const USER = process.env.DB_USER_ as string;
const PASSWORD = process.env.DB_PASSWORD_ as string;
const DATABASE = process.env.DB_DATABASE as string;

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: HOST,
      port: PORT,
      // user: USER,
      user: "root",
      // password: PASSWORD,
      password: "secret",
      database: DATABASE,
    },
  },
};

module.exports = config;
// export { config };
