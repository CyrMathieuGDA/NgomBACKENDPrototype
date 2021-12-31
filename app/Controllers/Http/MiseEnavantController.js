'use strict'

const MiseEnavant = use('App/Models/MiseEnavant')

class MiseEnavantController {
  /**
   * @swagger
   * /mise_enavant:
   *   get:
   *     tags:
   *       - API expo
   *     summary: renvoi tous les articles mis en avant
   *     responses:
   *       200:
   *         description: une liste de tous les articles mis en avant est renvoyé
   */
   async index() { return MiseEnavant.all() }

   /**
    * @swagger
    * /mise_enavant:
    *   post:
    *     tags:
    *       - API expo
    *     summary: mets en avant un nouvel article
    *     parameters:
    *         - name: expose
    *           in: body
    *           required: true
    *           schema:
    *              $ref: "#/definitions/MiseEnavant"
    *     responses:
    *       201:
    *         description: Article mis en avant avec succès.
    *       500:
    *         description: une Erreur s'est produite lors de la mise en avant de l'article.
    */
    async store({ request, response }) {
      try {
          const expo = await MiseEnavant.create({ 
              article: request.input('article')
          })
          return response.status(201).json(expo)
      } catch (error) {
          return response.status(500).send(error)
      }
  }

  /**
   * @swagger
   * /mise_enavant/{id}:
   *   get:
   *     tags:
   *       - API expo
   *     summary: renvoi un article mis en avant
   *     parameters:
   *         - name: id
   *           desciption: identifiant
   *           in: path
   *           schema:
   *              type: number
   *     responses:
   *       200:
   *         description: Expo renvoyé  avec succès
   *       400:
   *         description: Aucune expo ne correspond a cet identifiant!
   */
  async show({ response, params }) {
      try {
          const expo = await MiseEnavant.findOrFail(params.id)
          return response.status(200).json(expo)
      } catch (error) {
          return response.status(400).send('Aucune expo ne correspond a cet identifiant!')
      }
  }

  /**
   * @swagger
   * /mise_enavant/{id}:
   *   put:
   *     tags:
   *       - API expo
   *     summary: met a jour une expo
   *     parameters:
   *         - name: id
   *           desciption: identifiant
   *           in: path
   *           schema:
   *              type: number
   *         - name: expo
   *           in: body
   *           required: true
   *           schema:
   *              $ref: "#/definitions/MiseEnavant"
   *     responses:
   *       202:
   *         description: Expo mis a jour avec succès
   *       500:
   *         description: Echec de la mise a jour, veuillez reessayer!
   */
  async update({ request, response, params }) {
      try {
          const expo = await MiseEnavant.findOrFail(params.id)
          expo.article = request.input('article')
          expo.save()
          return response.status(202).json(expo)
      } catch (error) {
          return response.status(500).send('Echec de la mise a jour, veuillez reessayer!')
      }
  }

  /**
   * @swagger
   * /mise_enavant/{id}:
   *   delete:
   *     tags:
   *       - API expo
   *     summary: supprime une expo
   *     parameters:
   *         - name: id
   *           desciption: identifiant
   *           in: path
   *           schema:
   *              type: number
   *     responses:
   *       203:
   *         description: Suppression réussie
   *       400:
   *         description: Aucun résultat
   */
  async destroy({ params, response }) {
      try {
          const expo = await Categorie.find(params.id)
          await expo.delete()
          return response.status(203).send('Suppression réussie')
      } catch (error) {
          return response.status(500).send('Aucun résultat')
      }
    }
}

module.exports = MiseEnavantController
