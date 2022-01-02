'use strict'

const Article = use('App/Models/Article')

class ArticleController {
  /**
   * @swagger
   * /article:
   *   get:
   *     tags:
   *       - API article
   *     summary: retourne tous les articles
   *     responses:
   *       200:
   *         description: tous les articles sont retournes
   */
  async index() { return Article.all() }

  /**
   * @swagger
   * /article:
   *   post:
   *     tags:
   *       - API article
   *     summary: cree un article
   *     parameters:
   *         - name: article
   *           in: body
   *           required: true
   *           schema:
   *              $ref: "#/definitions/Article"
   *     responses:
   *       201:
   *         description: article enregistre avec succes
   *       500:
   *         description: un probleme s'est pose, veuillez ressayer
   */
  async store({ request, response }) {
      try {
          const article_ = await Article.create({
                  nom: request.input('nom'),
                  prix: request.input('prix'),
                  url_img: request.input('url_img'),
                  description: request.input('description'),
                  categorie: request.input('id_categorie')
              })
          return response.status(201).json(article_)
      } catch (error) {
          console.log(error.message)
          return response.status(500).send('Stockage impossible, veuillez reessayer!')
      }
  }

  /**
   * @swagger
   * /article/{id}:
   *   get:
   *     tags:
   *       - API article
   *     summary: retourne l'article correspondant a l'identifiant
   *     parameters:
   *         - name: id
   *           desciption: identifiant de l'article
   *           in: path
   *           schema:
   *              type: number
   *     responses:
   *       200:
   *         description: article retourne
   *       400:
   *         description: article introuvable
   */
  async show({ response, params }) {
      try {
          const article_ = await Article.findOrFail(params.id)
          return response.status(200).json(article_)
      } catch (error) {
          return response.status(400).send('Aucun resultat trouver')
      }
  }

  /**
   * @swagger
   * /article/{id}:
   *   put:
   *     tags:
   *       - API article
   *     summary: met a jour l'article correspondant a l'identifiant
   *     parameters:
   *         - name: id
   *           desciption: identifiant de l'article
   *           in: path
   *           schema:
   *              type: number
   *         - name: article
   *           in: body
   *           required: true
   *           schema:
   *              $ref: "#/definitions/ArticleModif"
   *     responses:
   *       202:
   *         description: article mis a jour avec succes
   *       500:
   *         description: echec de la mmis a jour, veuillez reessayer
   */
  async update({ request, response, params }) {
      try {
          const article_ = await Article.findOrFail(params.id)
          article_.nom = request.input('nom')
          article_.prix = request.input('prix')
          article_.url_img = request.input('url_img')
          article_.description = request.input('description')
          article_.categorie = request.input('categorie')
          article_.stock = request.input('stock')
          article_.promo = request.input('promo')
          article_.prix_promo = request.input('prix_promo')
          article_.save()
          return response.status(202).json(article_)
      } catch (error) {
          return response.status(500).send('Echec de la mise a jour, veuillez reessayer!')
      }
  }

  /**
   * @swagger
   * /article/{id}:
   *   delete:
   *     tags:
   *       - API article
   *     summary: supprime l'article correspondant a l'identifiant
   *     parameters:
   *         - name: id
   *           desciption: identifiant de l'article
   *           in: path
   *           schema:
   *              type: number
   *     responses:
   *       203:
   *         description: article supprime
   *       400:
   *         description: article introuvable
   */
  async destroy({ params, response }) {
      try {
          const article_ = await Article.find(params.id)
          await article_.delete()
          return response.status(203).send('suppression reussie')
      } catch (error) {
          return response.status(500).send('Aucun resultat ne correspond a cet id')
      }
  }
}

module.exports = ArticleController
