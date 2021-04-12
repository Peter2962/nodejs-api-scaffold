import jwt from 'jsonwebtoken';

export const generateAccessToken = (user, expiresIn = '60s') => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn});
}

export const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const accessToken = authHeader && authHeader.split(' ')[1];

	if (!accessToken) {
		return res.sendStatus(401);
	}

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
		if (error) {
			return res.sendStatus(401);
		}

		req.user = user;
		next();
	});
}