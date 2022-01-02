'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categorie extends Model {
    /**
     * @swagger
     * definitions:
     *  Categorie:
     *      type: object
     *      properties:
     *          nom:
     *              type: string
     *          unite:
     *              type: string
     */

    id = Number()

    nom = String()

    unite = String()

    created_at = Date()

    updated_at = Date()
}

module.exports = Categorie