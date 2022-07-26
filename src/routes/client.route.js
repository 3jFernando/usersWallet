const router = require('express').Router();
const { getAll, store } = require('../controllers/client.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    Client:
 *      type: object
 *      properties:
 *       Email:
 *        type: string
 *        description: ingresa el correo electronico del cliente
 *       FullName:
 *        type: string
 *        description: ingresa el nombre completo del cliente
 *       Password:
 *        type: string
 *        description: ingresa una clave para el cliente
 *       Cedula:
 *        type: string
 *        description: ingresa la Cedula para el cliente
 *       Direccional:
 *        type: string
 *        description: ingresa la Direccional del cliente
 *      required:
 *       - Email
 *       - FullName
 *       - Password
 *       - Cedula
 *       - Direccional
 *      example:
 *       Email: "fernando.claros@misena.edu.co"
 *       FullName: "Fernando Claros"
 *       Password: "123456"
 *       Cedula: 10293832
 *       Direccional: "calle 20a #12-22 barrio x"
 */

/**
 * 
 * @swagger 
 * /api/v1/clients:
 *  get:
 *   summary: Obtener el listado completo de los clientes
 *   tags: [Clientes] 
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200: 
 *     description: clientes cargados con exito. 
 *     content:
 *      application/json:
 *       schema: 
 *        type: array
 *        items:      
 *         $ref: '#/components/schemas/Client' 
 *    500: 
 *     description: Error, no fue posible procesar tu solicitud
 */
router.get('/', getAll)

/**
 * @swagger 
 * /api/v1/clients:
 *  post:
 *   summary: Crear Clientes
 *   tags: [Clientes]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema: 
 *       type: object
 *       $ref: '#/components/schemas/Client'
 *   responses:
 *    200: 
 *     description: Clientes creado con exito. 
 *    500: 
 *     description: Error, no fue posible procesar tu solicitud
 */
router.post('/', store)

module.exports = router;