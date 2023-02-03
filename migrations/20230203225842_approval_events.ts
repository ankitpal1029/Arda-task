import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("approval_events", (table) => {
    table.string("owner");
    table.string("amount");
    table.string("spender");
    table.string("blockstamp");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("approval_events");
}
