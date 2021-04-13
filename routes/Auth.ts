import jwt from 'jsonwebtoken';
import { User } from '../db/entities/User';
import { createConnection, getConnection } from 'typeorm';
import { body, validationResult } from 'express-validator';
import { generateAccessToken, authenticateToken } from '../Helpers.js';

const express = require('express');
const router = express.Router();

router.get('/check', (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const accessToken = authHeader && authHeader.split(' ')[1];

	if (!accessToken) {
		return res.json({error: 'unauthorized'}, 401);
	}

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
		if (error) {
			return res.json({error: 'unauthorized'}, 401);
		}

		return res.json({message: 'ok'});
	});
});

router.post(
	'/login',
	body('email').isEmail(),
	body('password').isLength({min: 8}), (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.json({errors: errors.array()});
	}

	(async() => {
		const user = await User.find({email: req.body.email, password: req.body.password});
		if (user.length < 1) {
			return res.json({error: 'Account not found'});
		}

		const payload = user[0];
		const accessToken = generateAccessToken({...payload});
		return res.json({access_token: accessToken});
	})();
});

router.post('/register', (req, res, next) => {
	
});

export default router;