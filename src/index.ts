import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/index';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

mongoose.connect(config.mongoURI).then(() => {
    console.log('Connected to MongoDB!');
    app.listen(config.port, () => {
        console.log(`Content Service is running on port ${config.port}.`);
    });
}).catch(err => {
    console.error('MongoDB connection error: ', err);
    process.exit(1);
});

app.get('/', (req, res) => {
    res.send(200).send('Content Service is running!');
});
