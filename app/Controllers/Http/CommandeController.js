'use strict'

const Commande = use('App/Models/Commande')
const ArticleCommande = use('App/Models/ArticleCommande')
// const Client = use('App/Models/Client')
// const mailjet = use('node-mailjet')
//     .connect('88c4aac0a69ec905a64db5eb91328578', '6dec295c3ad9607abfddc4195e8e9c5d')

class CommandeController {
  /**
   * @swagger
   * /commande:
   *   get:
   *     tags:
   *       - API commande
   *     summary: renvoi toutes les commande
   *     responses:
   *       200:
   *         description: renvoi la liste des commande enregistres
   */
  async index() { return Commande.all() }

  /**
   * @swagger
   * /commande:
   *   post:
   *     tags:
   *       - API commande
   *     summary: enregistre une nouvelle commande
   *     parameters:
   *         - name: commande
   *           in: body
   *           required: true
   *           schema:
   *              $ref: "#/definitions/Commande"
   *     responses:
   *       201:
   *         description: Commande enregistree avec succes
   *       500:
   *         description: une Erreur s'est produite lors de la creation de la commande, verifiez les erreurs
   */
  async store({ request, response }) {
      const total = request.input('total_commande')
      const pay = request.input('mode_paiement')
      const client = request.input('id_client')
      const stat = request.input('status')
      const articles_ = request.input('articles')
      // const client_ = await Client.findOrFail(client)
      /* const requestOwner = mailjet
      .post("send", { 'version': 'v3.1' })
      .request({
          "Messages": [{
              "From": {
                  "Email": "exemple@xyz.com",
                  "Name": "Exemple"
              },
              "To": [{
                  "Email": client_.$attributes.email_client,
                  "Name": client_.$attributes.prenom_nom_client
              },
              {
                  "Email": "ex@yz.com",
                  "Name": "Ex"
              }],
              "Subject": "Notification de commande",
              "TextPart": "Mail notifiant une nouvelle commande",
              "HTMLPart": "<h1>Commande passée avec succès!</h1>",
              "CustomID": "LaFrancoiseMailer"
          }]
      }) */
      
      /* let text = '[',
          i = 0
      if(articles_.length > 1) {
          for(; i < articles_.length -1 ; i++) text += '{"id_article": ' + articles_[i].id + ', "quantite": ' + articles_[i].quantite + '}, '
          text += '{"id_article": ' + articles_[i].id + ', "quantite": ' + articles_[i].quantite + '}]'
      } else text += '{"id_article": ' + articles_[i].id + ', "quantite": ' + articles_[i].quantite + '}]'
      requestOwner */

      try{
          const commande_ = await Commande.create({
              total_commande: total,
              mode_paiement: pay,
              id_client: client,
              status: stat,
              articles: text
          })
          .then(res => {
              articles_.forEach(item => {
                  await ArticleCommande.create({
                      id_article: item.id,
                      quantite: item.quantite,
                      id_commande: commande_.$attributes.id
                  })
              })
          })
          .catch(err => console.log(err))
          return response.status(201).json(commande_)
      } catch(error){
          response.status(400).json(error)
      }
  }

  /**
   * @swagger
   * /commande/{id}:
   *   get:
   *     tags:
   *       - API commande
   *     summary: renvois la commande correspondante a l'identifiant
   *     parameters:
   *         - name: id
   *           desciption: identifiant
   *           in: path
   *           schema:
   *              type: number
   *     responses:
   *       200:
   *         description: Commande renvoyee avec succes
   *       400:
   *         description: aucune commande ne correspond a cet identifiant
   */
  async show({ response, params }) {
      try {
          const commande_ = await Commande.findOrFail(params.id)
          return response.status(200).json(commande_)
      } catch (error) {
          return response.status(400).send('Aucun resultat trouver')
      }
  }

  /**
   * @swagger
   * /commande/{id}:
   *   put:
   *     tags:
   *       - API commande
   *     summary: met a jour une commande
   *     parameters:
   *         - name: id
   *           desciption: identifiant
   *           in: path
   *           schema:
   *              type: number
   *         - name: statusCommande
   *           in: body
   *           required: true
   *           schema:
   *              $ref: "#/definitions/StatusCommande"
   *     responses:
   *       202:
   *         description: commande mis a jour avece succes
   *       500:
   *         description: une erreur s'est produite lors de la mise a jour
   */
  async update({ request, response, params }) {
      try {
          const commande_ = await Commande.findOrFail(params.id)
          commande_.status = request.input('status')
          commande_.save()
          return response.status(202).json(commande_)
      } catch (error) {
          return response.status(500).send('Echec de la mise a jour, veuillez reessayer!')
      }
  }

  /**
   * @swagger
   * /commande/{id}:
   *   delete:
   *     tags:
   *       - API commande
   *     summary: supprime une commande
   *     parameters:
   *         - name: id
   *           desciption: identifiant
   *           in: path
   *           schema:
   *              type: number
   *     responses:
   *       203:
   *         description: commande supprimee avec succes
   *       400:
   *         description: aucune commande ne correspond a cet identifiant
   */
  async destroy({ params, response }) {
      try {
          const commande_ = await Commande.find(params.id)
          await commande_.delete()
          return response.status(203).send('suppression reussie')
      } catch (error) {
          return response.status(500).send('Aucun resultat ne correspond a cet id')
      }
  }
}

module.exports = CommandeController
