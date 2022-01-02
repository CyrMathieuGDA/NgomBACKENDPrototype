'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MiseEnavant extends Model {
    /**
     * @swagger
     * definitions:
     *  MiseEnavant:
     *      type: object
     *      properties:
     *          article:
     *              type: number
     */

    id = Number()

    article = Number()

    created_at = Date()

    updated_at = Date()
}

module.exports = MiseEnavant
