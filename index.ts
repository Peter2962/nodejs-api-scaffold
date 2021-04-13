import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { port, dbConfig, apiVersion } from './Config.js';
import { createConnection, getConnection } from 'typeorm';

// routes //
import Auth from './routes/Auth';
import Users from './routes/Users';
// end routes //

createConnection().then(() => {
	dotenv.config();

	const cors = require('cors');
	const express = require('express');
	const app = express();
	const router = express.Router();
	const bodyParser = require('body-parser');

	const corsOptions = {
		origin: '*'
	};

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(express.json());
	app.use(cors(corsOptions));

	app.use(`/${apiVersion}/auth`, Auth);
	app.use(`/${apiVersion}/users`, Users);

	app.listen(port, () => {
		console.log(`Listening to app on port: ${port}`);
	});
});