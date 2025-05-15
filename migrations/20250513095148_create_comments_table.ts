import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comments',(table:Knex.CreateTableBuilder)=>{
    table.increments('id').primary()
    table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
    table.string('author').notNullable()
    table.text('content').notNullable()
    table.timestamps(true,true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('comments')
}

