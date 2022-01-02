'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {
    /**
     * @swagger
     * definitions:
     *  Client:
     *      type: object
     *      properties:
     *          nom_complet:
     *              type: string
     *          email:
     *              type: string
     *          tel:
     *              type: string
     *          adresse:
     *              type: string
     *          passwd:
     *              type: string
     */

    id = Number()

    nom_complet = String()

    email = String()

    tel = String()

    adresse = String()

    passwd = String()

    created_at = Date()

    updated_at = Date()
}

module.exports = Client
