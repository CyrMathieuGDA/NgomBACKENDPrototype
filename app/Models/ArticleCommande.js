'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ArticleCommande extends Model {
    /**
     * @swagger
     * definitions:
     *  ArticleCommande:
     *      type: object
     *      properties:
     *          article:
     *              type: number
     *          commande:
     *              type: number
     *          quantite:
     *              type: number
     */

    id = Number()

    article = Number()

    commande = Number()

    quantite = Number()

    created_at = Date()

    updated_at = Date()
}

module.exports = ArticleCommande
