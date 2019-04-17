import smsController from '../controllers/smsController';
import { validateBody, schemas, validateParams } from '../validators/contact';

const express = require('express');

const router = express.Router();

router.route('/contacts/sms')
  .post(validateBody(schemas().createSms), smsController.createMessage)
  .get(smsController.getAllMessages);

router.get('/contacts/:senderId/sent/sms',
  validateParams(schemas().getSmsBysenderId),
  smsController.getSenderSmsById);

router.get('/contacts/:receiverId/received/sms',
  validateParams(schemas().getSmsByreceiverId),
  smsController.getReceiversSmsById);

router.delete('/contacts/:senderId/sent/sms/:messageId',
  validateParams(schemas().deleteSentSmsById),
  smsController.deleteSendersSmsByIds);

router.delete('/contacts/:receiverId/received/sms/:messageId',
  validateParams(schemas().deleteReceivedSmsById),
  smsController.deleteReceiversSmsByIds);

export default router;