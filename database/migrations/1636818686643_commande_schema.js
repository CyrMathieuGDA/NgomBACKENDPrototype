'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommandeSchema extends Schema {
    up() {
        this.create('commandes', (table) => {
            table.increments().primary()
            table.timestamps()
            table.string('articles').notNullable()
            table.integer('total').unsigned().notNullable()
            table.string('mode_paiement', 100).notNullable()
            table.integer('client').unsigned().notNullable()
            table.foreign('client').references('clients.id')
            table.string('status').notNullable()
        })
    }

    down() {
        this.drop('commandes')
    }
}

module.exports = CommandeSchema