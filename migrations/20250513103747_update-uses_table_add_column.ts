import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users',(table:Knex.CreateTableBuilder)=>{
    table.string('email',255).notNullable()
    table.string("password").notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users',(table:Knex.CreateTableBuilder)=>{
    table.dropColumn('email')
    table.dropColumn("password")
  })
}

