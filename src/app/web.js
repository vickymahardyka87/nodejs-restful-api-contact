import express from 'express';
import { publicRouter } from '../routes/public-api.js';
import { errorMiddleware } from '../middleware/error-midleware.js';
import { router } from '../routes/api.js';
import cors from 'cors';

const web = express();

web.use(express.json());
web.use(cors());

web.use(publicRouter);
web.use(router);
web.use(errorMiddleware);

export default web;
