import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("approval_events", (table) => {
      table.string("owner").notNullable();
      table.string("spender").notNullable();
      table.string("amount").notNullable();
      table.string("blocknumber").notNullable();
      table.string("tokenaddress").notNullable();
    })
    .createTable("approval_ledger", (table) => {
      table.string("owner").notNullable();
      table.string("spender").notNullable();
      table.string("amount").notNullable();
      table.string("tokenaddress").notNullable();
    })
    .raw(
      "ALTER TABLE approval_ledger ADD CONSTRAINT owner_spender_tokenaddress UNIQUE (owner, spender, tokenaddress)"
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("approval_events").dropTable("approval_ledger");
}
