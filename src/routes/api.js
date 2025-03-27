import express from 'express';
import userController from '../controller/user-controller.js';
import contactController from '../controller/contact-controller.js';
import addressController from '../controller/address-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const router = new express.Router();
router.use(authMiddleware);

// User API
router.get('/api/users/current', userController.get);
router.patch('/api/users/current', userController.update);
router.delete('/api/users/logout', userController.logout);

// Contact API
router.post('/api/contacts', contactController.create);
router.get('/api/contacts/:contactId', contactController.get);
router.put('/api/contacts/:contactId', contactController.update);
router.delete('/api/contacts/:contactId', contactController.remove);
router.get('/api/contacts', contactController.search);

// Address API
router.post('/api/contacts/:contactId/addresses', addressController.create);
router.get('/api/contacts/:contactId/addresses/:addressId', addressController.get);
router.put('/api/contacts/:contactId/addresses/:addressId', addressController.update);
router.delete('/api/contacts/:contactId/addresses/:addressId', addressController.remove);
router.get('/api/contacts/:contactId/addresses', addressController.list);

export { router };
