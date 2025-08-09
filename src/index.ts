import express from 'express';
import { config } from './config/index';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send(200).send('Content Service is running!');
});

app.listen(config.port, () => {
    console.log(`Content Service is running on port ${config.port}.`);
});
