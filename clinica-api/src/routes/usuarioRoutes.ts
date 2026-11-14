import { Router } from 'express';
import { cadastrar, login } from '../controllers/usuarioController';
import { validarBody } from '../middlewares/validarSchema';

// @ts-ignore
import { usuarioSchema, loginSchema } from '../../../shared/index';

const router = Router();

router.post('/cadastro', validarBody(usuarioSchema), cadastrar);
router.post('/login', validarBody(loginSchema), login);

export default router;