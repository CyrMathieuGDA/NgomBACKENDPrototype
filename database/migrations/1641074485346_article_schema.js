'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleSchema extends Schema {
  up() {
      this.create('articles', (table) => {
          table.increments()
          table.string('nom', 100).notNullable().unique()
          table.integer('prix').unsigned().notNullable()
          table.string('url_img', 100)
          table.string('description', 255)
          table.integer('categorie').unsigned().notNullable()
          table.foreign('categorie').references('categories.id')
          table.boolean('stock').notNullable().defaultTo(true)
          table.boolean('promo').notNullable().defaultTo(false)
          table.integer('prix_promo').notNullable().defaultTo(0)
          table.timestamps()
      })
  }

  down() {
      this.drop('articles')
  }
}

module.exports = ArticleSchema
