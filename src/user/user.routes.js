
import express from 'express'

import { test, register, login } from './user.controller.js';

import {  validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = express.Router();

api.post('/register', register)
api.post('/login', login)
api.get('/test', [validateJwt, isAdmin], test)

export default api