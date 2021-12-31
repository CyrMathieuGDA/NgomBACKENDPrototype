'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Commande extends Model {
    /**
     * @swagger
     * definitions:
     *  Commande:
     *      type: object
     *      properties:
     *          articles:
     *              type: array
     *              items:
     *                  type: object
     *                  properties:
     *                      id_article:
     *                          type: integer
     *                      quantite:
     *                          type: integer
     *                  required:
     *                      - id
     *                      - quantite
     *          total:
     *              type: number
     *          mode_paiement:
     *              type: string
     *          client:
     *              type: number
     *          status:
     *              type: string
     */

    
    /**
     * @swagger
     * definitions:
     *  StatusCommande:
     *      type: object
     *      properties:
     *          status:
     *              type: string
     */

    id = Number()

    articles = String()

    total = Number()

    mode_paiement = String()

    client = Number()

    status = String()

    created_at = Date()

    updated_at = Date()
}

module.exports = Commande