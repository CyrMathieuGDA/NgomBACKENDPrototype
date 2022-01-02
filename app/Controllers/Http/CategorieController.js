'use strict'

const Categorie = use('App/Models/Categorie')

class CategorieController {
  /**
   * @swagger
   * /categorie:
   *   get:
   *     tags:
   *       - API categorie
   *     summary: renvoi toutes les categories
   *     responses:
   *       200:
   *         description: renvoi la liste des categories enregistres
   */
  async index() { return Categorie.all() }

  /**
   * @swagger
   * /categorie:
   *   post:
   *     tags:
   *       - API categorie
   *     summary: enregistre une nouvelle categorie
   *     parameters:
   *         - name: categorie
   *           in: body
   *           required: true
   *           schema:
   *              $ref: "#/definitions/Categorie"
   *     responses:
   *       201:
   *         description: Categorie creee avec succes
   *       500:
   *         description: une Erreur s'est produite lors de la creation de la categorie, verifiez les erreurs
   */
  async store({ request, response }) {
      try {
          const categotie_ = await Categorie.create({ 
              nom: request.input('nom'),
              unite:  request.input('unite')
          })
          return response.status(201).json(categotie_)
      } catch (error) {
          return response.status(500).send(error)
      }
  }

  /**
   * @swagger
   * /categorie/{id}:
   *   get:
   *     tags:
   *       - API categorie
   *     summary: renvois la categorie correspondante a l'identifiant
   *     parameters:
   *         - name: id
   *           desciption: identifiant
   *           in: path
   *           schema:
   *              type: number
   *     responses:
   *       200:
   *         description: categorie renvoyee avec succes
   *       400:
   *         description: aucune categorie ne correspond a cet identifiant
   */
  async show({ response, params }) {
      try {
          const categotie_ = await Categorie.findOrFail(params.id)
          return response.status(200).json(categotie_)
      } catch (error) {
          return response.status(400).send('Aucun resultat trouver')
      }
  }

  /**
   * @swagger
   * /categorie/{id}:
   *   put:
   *     tags:
   *       - API categorie
   *     summary: met a jour une categorie
   *     parameters:
   *         - name: id
   *           desciption: identifiant
   *           in: path
   *           schema:
   *              type: number
   *         - name: categorie
   *           in: body
   *           required: true
   *           schema:
   *              $ref: "#/definitions/Categorie"
   *     responses:
   *       202:
   *         description: categorie mis a jour avece succes
   *       500:
   *         description: une erreur s'est produite lors de la mise a jour
   */
  async update({ request, response, params }) {
      try {
          const categotie_ = await Categorie.findOrFail(params.id)
          categotie_.nom = request.input('nom')
          categorie_.unite = request.input('unite')
          categotie_.save()
          return response.status(202).json(categotie_)
      } catch (error) {
          return response.status(500).send('Echec de la mise a jour, veuillez reessayer!')
      }
  }

  /**
   * @swagger
   * /categorie/{id}:
   *   delete:
   *     tags:
   *       - API categorie
   *     summary: supprime une categorie
   *     parameters:
   *         - name: id
   *           desciption: identifiant
   *           in: path
   *           schema:
   *              type: number
   *     responses:
   *       203:
   *         description: categorie supprimee avec succes
   *       400:
   *         description: aucune categorie ne correspond a cet identifiant
   */
  async destroy({ params, response }) {
      try {
          const categotie_ = await Categorie.find(params.id)
          await categotie_.delete()
          return response.status(203).send('suppression reussie')
      } catch (error) {
          return response.status(500).send('Aucun resultat ne correspond a cet id')
      }
  }
}

module.exports = CategorieController
