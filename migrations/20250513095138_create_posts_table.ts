import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts',(table:Knex.CreateTableBuilder)=>{
    table.increments('id').primary(),
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete("CASCADE")
    table.string('title').notNullable()
    table.text('content').notNullable()
    table.timestamps(true,true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('posts')
}

