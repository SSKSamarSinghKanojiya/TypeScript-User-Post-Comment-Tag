import { knex, type Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts_tags',(table:Knex.CreateTableBuilder)=>{
    table.increments('id').primary()
    table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE')
    table.integer('tag_id').unsigned().notNullable().references('id').inTable('tags').onDelete('CASCADE')
    table.primary(['post_id','tag_id'])
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('posts_tags')
}


