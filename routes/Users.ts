import { authenticateToken } from '../Helpers.js';

const express = require('express');
const router = express.Router();

router.use(authenticateToken);

router.get('/', (req, res, next) => {

});

export default router;