'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MiseEnavantSchema extends Schema {
  up () {
    this.create('mise_enavants', (table) => {
      table.increments()
      table.integer('article').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('mise_enavants')
  }
}

module.exports = MiseEnavantSchema
