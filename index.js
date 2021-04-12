import cors from 'cors';
import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { port, dbConfig, apiVersion } from './Config.js';

// routes //
import Auth from './routes/Auth.js';
import Users from './routes/Users.js';
// end routes //

dotenv.config();

const app = express();
const router = express.Router();

const corsOptions = {
	origin: '*'
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(`/${apiVersion}/auth`, Auth);
app.use(`/${apiVersion}/users`, Users)

app.listen(port, () => {
	console.log(`Listening to app on port: ${port}`);
});