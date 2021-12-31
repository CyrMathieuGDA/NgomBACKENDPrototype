'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class QuantiteArticleCommande extends Model {
    article = Number()
    quantite = Number()

    constructor(article, quantite) {
        super()
        this.article = article
        this.quantite = quantite
    }
}

module.exports = QuantiteArticleCommande