import express from 'express';
import suggestions from './suggestions';

const router = express.Router();

router.use('/suggestions', require('./suggestions').default);
router.use('/users', require('./users').default);

export default router;
