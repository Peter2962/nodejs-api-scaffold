import express from 'express';
import jwt from 'jsonwebtoken';
import { generateAccessToken, authenticateToken } from '../Helpers.js';

const router = express.Router();

router.get('/check', (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const accessToken = authHeader && authHeader.split(' ')[1];

	if (!accessToken) {
		return res.json({message: 'unauthorized'}, 401);
	}

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
		if (error) {
			return res.json({message: 'unauthorized'}, 401);
		}

		return res.json({message: 'ok'});
	});
});

router.post('/login', (req, res, next) => {

});

router.post('/register', (req, res, next) => {

});

export default router;