import Joi from 'joi';

const validateBody = (schema) => {
  return (req, res, next) => {
    const { value, error } = Joi.validate(req.body, schema);

    if (error) {
      return res.status(400).json(error);
    }

    if (!req.value) { req.value = {}; }
    req.value['body'] = value;
    next();
  }
}

const validateParams = (schema) => {
  return (req, res, next) => {
    const { value, error } = Joi.validate(req.params, schema);

    if (error) {
      return res.status(400).json(error);
    }

    if (!req.value) { req.value = {}; }
    req.value['params'] = value;
    next();
  }
}

const schemas = () => ({
  createContact: Joi.object().keys({
    name: Joi.string().trim().required(),
    phoneNumber: Joi.number().required()
  }),
  createSms: Joi.object().keys({
    senderId: Joi.number().integer().required(),
    receiverId: Joi.number().integer().required(),
    message: Joi.string().trim().required(),
    status: Joi.string().trim().required()
  }),
  getSmsBysenderId: Joi.object().keys({
    senderId: Joi.number().integer().required()
  }),
  getSmsByreceiverId: Joi.object().keys({
    receiverId: Joi.number().integer().required()
  }),
  deleteSentSmsById: Joi.object().keys({
    senderId: Joi.number().integer().required(),
    messageId: Joi.number().integer().required()
  }),
  deleteReceivedSmsById: Joi.object().keys({
    receiverId: Joi.number().integer().required(),
    messageId: Joi.number().integer().required()
  }),
  deleteContactById: Joi.object().keys({
    contactId: Joi.number().integer().required()
  }),
})

export { validateBody, validateParams, schemas };
