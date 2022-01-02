'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorieSchema extends Schema {
    up() {
        this.create('categories', (table) => {
            table.increments()
            table.string('nom', 100).notNullable().unique()
            table.string('unite', 50).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('categories')
    }
}

module.exports = CategorieSchema
