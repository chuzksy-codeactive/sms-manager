import models from '../../models';

const createMessage = (req, res) => {
  const {
    message,
    senderId,
    receiverId,
    status,
  } = req.body;

  return models.Message
    .create({
      message, senderId, receiverId, status
    }).then(sms => {
      return res.status(201).json({
        message: 'Sms successfully created',
        data: sms
      })
    }).catch(err => {
      return res.status(400).json({
        message: 'Error occured during operation',
        error: err
      });
    });
  }

const getAllMessages = (req, res) => {

  return models.Message
    .findAll({
      include: [models.Contact]
    }).then(sms => {
      return res.status(200).json({
        message: 'Sms successfully retrieved',
        data: sms
      });
    }).catch(err => {
      return res.status(400).json({
        message: 'Error occured during retrieving',
        error: err
      })
    });
}

const getSenderSmsById = (req, res) => {
  const { senderId } = req.params;

  return models.Message.findAll({
    where: {
      senderId
    }
  }).then(sms => {
    if (sms.length === 0) {
      return res.status(404).json({
        message: 'User message not found',
        data: sms
      });
    }

    return res.status(200).json({
      message: 'Sms successfully retrieved',
      data: sms
    });
  }).catch(err => {
    return res.status(400).json({
      message: 'Error occured during retrieving',
      error: err
    });
  });  
}

const getReceiversSmsById = (req, res) =>  {
  const { receiverId } = req.params;

  return models.Message.findAll({
    where: {
      receiverId
    }
  }).then(sms => {
    if (sms.length === 0) {
      return res.status(404).json({
        messge: 'User message not found',
        data: sms
      });
    }

    return res.status(200).json({
      message: 'Sms successfully retrieved',
      data: sms
    });
  }).catch(err => {
    return res.status(400).json({
      message: 'Error occured during retrieving',
      error: err
    });
  }); 
}

const deleteSendersSmsByIds = (req, res) => {
  const { senderId, messageId } = req.params;

  return models.Message .findAll({
    where: {
      senderId,
      id: messageId
    }
  }).then(sms => {
    if (sms.length === 0) {
      return res.status(404).json({
        message: 'User message not found',
        data: sms
      });
    }

    return models.Message.destroy({
      where: {
        id: messageId
      }
    }).then(deleted => {
      return res.status(200).json({
        message: 'Sms successfully deleted',
        data: sms
      });
    }).catch(err => {
      return res.status(400).json({
        message: 'Error occured during deletion',
        error: err
      });
    });   
  }).catch(err => {
    return res.status(400).json({
      message: 'Error occured during retrieving',
      error: err
    });
  });
}

const deleteReceiversSmsByIds = (req, res) => {
  const { receiverId, messageId } = req.params;

  return models.Message.findAll({
    where: {
      receiverId,
      id: messageId
    }
  }) .then(sms => {
    if (sms.length === 0) {
      return res.status(404).json({
        message: 'User message not found',
        data: sms
      });
    }

    return models.Message.destroy({
      where: {
        id: messageId
      }
    }).then(deleted => {
      return res.status(200).json({
        message: 'Sms successfully deleted',
        data: sms
      });
    }).catch(err => {
      return res.status(400).json({
        message: 'Error occured during deletion', 
        error: err
      });
    });  
  }).catch(err => {
    return res.status(400).json({
      message: 'Error occured during retrieving',
      error: err
    });
  });
}

const MessageController = {
  createMessage,
  getAllMessages,
  getSenderSmsById,
  getReceiversSmsById,
  deleteSendersSmsByIds,
  deleteReceiversSmsByIds
}

export default MessageController;