const router = require('express').Router();
const { getAllWallets, storeWallet, toUpWallet } = require('../controllers/wallet.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    Wallet:
 *      type: object
 *      properties:
 *       UserID:
 *        type: string
 *        description: ingresa 
 *       BalanceUSD:
 *        type: string
 *        description: ingresa el valor inicial, teniendo en cuenta su Divisa, valor en Dolares
 *       BalanceCOP:
 *        type: string
 *        description: ingresa el valor inicial, teniendo en cuenta su Divisa, valor en Pesos
 *      required:
 *       - UserID
 *       - BalanceUSD
 *       - BalanceCOP
 *      example:
 *       UserID: "ID_CLIENTE"
 *       BalanceUSD: 1
 *       BalanceCOP: 4300
 */

/**
 * 
 * @swagger 
 * /api/v1/wallets:
 *  get:
 *   summary: Obtener el listado completo de las billeteras
 *   tags: [Billeteras] 
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200: 
 *     description: billeteras cargadas con exito. 
 *     content:
 *      application/json:
 *       schema: 
 *        type: array
 *        items:      
 *         $ref: '#/components/schemas/Wallet' 
 *    500: 
 *     description: Error, no fue posible procesar tu solicitud
 */
router.get('/', getAllWallets)

/**
 * @swagger 
 * /api/v1/wallets:
 *  post:
 *   summary: Crear billeteras
 *   tags: [Billeteras]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema: 
 *       type: object
 *       $ref: '#/components/schemas/Wallet'
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200: 
 *     description: billetera creada con exito. 
 *    500: 
 *     description: Error, no fue posible procesar tu solicitud
 */
router.post('/', storeWallet)

/**
 * 
 * @swagger 
 * /api/v1/wallets/{id}:
 *  put:
 *   summary: Recargar billeteras
 *   tags: [Billeteras]
 *   parameters:
 *    - name: id
 *      required: true
 *      in: path
 *      description: Identificador de la billetera, usado para verificar si la misma existe
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema: 
 *       type: object
 *       properties: 
 *        Balance: 
 *         type: string
 *         required: true
 *         example: 20
 *        typeTopUp: 
 *          type: string
 *          example: USD
 *   responses:
 *    200: 
 *     description: billetera creada con exito.
 *    404: 
 *     description: Debes enviar un ID de la waller valido
 *    500: 
 *     description: Error, no fue posible procesar tu solicitud
 * 
 */
router.put('/:id', toUpWallet)

module.exports = router;