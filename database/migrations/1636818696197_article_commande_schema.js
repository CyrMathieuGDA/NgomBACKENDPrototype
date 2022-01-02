'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleCommandeSchema extends Schema {
    up() {
        this.create('article_commandes', (table) => {
            table.increments()
            table.integer('article').unsigned().notNullable()
            table.integer('commande').unsigned().notNullable()
            table.integer('quantite').unsigned().notNullable()
            table.foreign('article').references('articles.id')
            table.foreign('commande').references('commandes.id')
            table.timestamps()
        })
    }

    down() {
        this.drop('article_commandes')
    }
}

module.exports = ArticleCommandeSchema