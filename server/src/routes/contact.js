import contactController from '../controllers/contactController';
import { validateBody, schemas } from '../validators/contact';

const express = require('express');

const router = express.Router();

router
  .route('/contacts')
    .post(validateBody(schemas().createContact), contactController.createContact)
    .get(contactController.getAllContacts)

export default router;
