'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up() {
      this.create('clients', (table) => {
          table.increments()
          table.string('nom_complet', 255).notNullable()
          table.string('email', 100).notNullable().unique()
          table.string('tel', 100).notNullable()
          table.string('adresse', 100).notNullable()
          table.string('passwd').notNullable()
          table.timestamps()
      })
  }

  down() {
      this.drop('clients')
  }
}

module.exports = ClientSchema
