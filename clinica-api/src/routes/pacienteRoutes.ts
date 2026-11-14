import { Router } from 'express';
import { findAll, findOne, create, update, remove } from '../controllers/pacienteController';
import { validarBody } from '../middlewares/validarSchema';

// @ts-ignore
import { pacienteSchema } from '../../../shared/index';

const router = Router();

router.get('/', findAll);
router.get('/:id', findOne);

// Aplicando a validação do Zod no POST e no PUT
/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 */
router.post('/', validarBody(pacienteSchema), create);

router.put('/:id', validarBody(pacienteSchema), update);

router.delete('/:id', remove);

export default router;