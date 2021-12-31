'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Article extends Model {
    /**
     * @swagger
     * definitions:
     *  Article:
     *      type: object
     *      properties:
     *          nom:
     *              type: string
     *          prix:
     *              type: number
     *          url_img:
     *              type: string
     *          description:
     *              type: string
     *          categorie:
     *              type: number
     */
    
    /**
     * @swagger
     * definitions:
     *  ArticleModif:
     *      type: object
     *      properties:
     *          nom:
     *              type: string
     *          prix:
     *              type: number
     *          url_img:
     *              type: string
     *          description:
     *              type: string
     *          categorie:
     *              type: number
     *          stock:
     *              type: boolean
     *          promo:
     *              type: boolean
     *          prix_promo:
     *              type: number
     */

    id = Number()

    nom = String()

    prix = Number()

    url_img = String()

    description = String()

    categorie = Number()

    stock = Boolean()
    
    promo = Boolean()

    prix_promo = Number()

    created_at = Date()

    updated_at = Date()
}

module.exports = Article