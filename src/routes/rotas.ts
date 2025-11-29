import { Router } from 'express';
import { OrdemController } from '../controllers/OrdemController';

const router = Router();

router.post('/ordens', OrdemController.create);
router.get('/ordens', OrdemController.getAll);
router.get('/ordens/:id', OrdemController.getById);
router.put('/ordens/:id', OrdemController.update);
router.delete('/ordens/:id', OrdemController.delete);

export default router;