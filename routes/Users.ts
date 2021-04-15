import { User } from '../db/entities/User';
import { authenticateToken } from '../Helpers.js';
import { body, validationResult } from 'express-validator';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.use(authenticateToken);

router.post(
	'/',
	body('email').isEmail(),
	body('first_name').notEmpty(),
	body('last_name').notEmpty(),
	body('password').isLength({min: 8}),
	(req, res, next) => {

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

				return res.send(user);
			})();
		});
	})();
});

router.put(
	'/:id',
	body('email').isEmail(),
	body('first_name').notEmpty(),
	body('last_name').notEmpty(),
	(req, res, next) => {
	(async() => {
		const user = await User.findOne({id: req.params.id});
		if (!user) return res.json({error: 'User not found'}, 404);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({errors: errors.array()});
		}

		user.email = req.body.email;
		user.first_name = req.body.first_name;
		user.last_name = req.body.last_name;
		await user.save();

		return res.json(user);
	})();
});

router.get('/', (req, res, next) => {
	(async() => {
		const users = await User.find();
		return res.json(users);
	})();
});

router.get('/:id', (req, res, next) => {
	(async() => {
		const user = await User.findOne({id: req.params.id});
		if (!user) return res.json({error: 'User not found'}, 404);

		return res.json(user);
	})();
});

router.delete('/:id', (req, res, next) => {
	(async() => {
		const user = await User.findOne({id: req.params.id});
		if (!user) return res.json({error: 'User not found'}, 404);

		user.remove();
		return res.send('User has been deleted');
	})();
});

export default router;