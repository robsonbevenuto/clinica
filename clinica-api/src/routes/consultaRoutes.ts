import { Router } from 'express';
import { findAll, findOne, create, update, remove } from '../controllers/consultaController';
import { validarBody } from '../middlewares/validarSchema';

// @ts-ignore
import { consultaSchema } from '../../../shared/index';

const router = Router();

router.get('/', findAll);
router.get('/:id', findOne);

router.post('/', validarBody(consultaSchema), create);
router.put('/:id', validarBody(consultaSchema), update);

router.delete('/:id', remove);

export default router;