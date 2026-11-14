import { Router } from 'express';
import { findAll, findOne, create, update, remove } from '../controllers/medicoController';
import { validarBody } from '../middlewares/validarSchema';

// @ts-ignore
import { medicoSchema } from '../../../shared/index';

const router = Router();

router.get('/', findAll);
router.get('/:id', findOne);

router.post('/', validarBody(medicoSchema), create);
router.put('/:id', validarBody(medicoSchema), update);

router.delete('/:id', remove);

export default router;