const router = require('express').Router();
const { login } = require('../controllers/auth.controller');

/**
 * 
 * @swagger 
 * /api/v1/auth/login:
 *  post:
 *   summary: Iniciar sesión
 *   tags: [Iniciar sesión]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema: 
 *       type: object
 *       properties: 
 *        Email: 
 *         type: string
 *         required: true
 *        Password: 
 *          type: string
 *   responses:
 *    200: 
 *     description: Sesión iniciada con exito
 *    401: 
 *     description: Usuario no autorizado
 *    500: 
 *     description: Error, no fue posible procesar tu solicitud
 */
router.post('/login', login)

module.exports = router;