import { authenticateToken } from '../Helpers.js';

const express = require('express');
const router = express.Router();

router.use(authenticateToken);

router.get('/', (req, res, next) => {
	next();
});

router.get('/:id', (req, res, next) => {
	next();
});

export default router;