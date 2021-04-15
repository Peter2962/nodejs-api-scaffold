import { User } from '../db/entities/User';
import { createConnection, getConnection } from 'typeorm';
import { body, validationResult } from 'express-validator';
import { generateAccessToken, authenticateToken } from '../Helpers.js';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

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
		const accessToken = generateAccessToken({...payload}, process.env.AUTH_TTL);
		return res.json({access_token: accessToken});
	})();
});

router.post(
	'/register',
	body('email').isEmail(),
	body('first_name').notEmpty(),
	body('last_name').notEmpty(),
	body('password').isLength({min: 8}),
	body('password_confirmation').notEmpty(),
	(req, res, next) => {
	
	const bcrypt = require('bcrypt');
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.json({errors: errors.array()});
	}

	(async() => {
		const user = await User.find({email: req.body.email});
		if (user.length > 0) {
			return res.json({error: 'Account found'}, 500);
		}

		bcrypt.hash(req.body.password, 10, (err, hash) => {
			const password = hash;
			(async() => {
				const user = new User();
				user.first_name = req.body.first_name;
				user.last_name = req.body.last_name;
				user.email = req.body.email;
				user.password = password;
				await user.save();

				const accessToken = generateAccessToken({...user}, process.env.AUTH_TTL);
				return res.send({access_token: accessToken});
			})();
		});
	})();

});

export default router;