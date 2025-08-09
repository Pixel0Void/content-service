import { Router } from 'express';
import { getAllHeroes, getHeroById, getUpdates, insertNewHero, updateHero } from '../controllers/heroController';

const router = Router();

router.get('/', getAllHeroes);
router.get('/:id', getHeroById);
router.post('/', insertNewHero);
router.post('/updates', getUpdates);
router.patch('/:id', updateHero);

export default router;
