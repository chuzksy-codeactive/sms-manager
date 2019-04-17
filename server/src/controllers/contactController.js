import models from '../../models';

const createContact = (req, res) => {
  const { name, phoneNumber } = req.body;

  return models.Contact.findOrCreate({
    where: { name, phoneNumber }
  }).then(([contact, created]) => {
    if (!created) {
      return res.status(400).json({
        message: 'Contact already exit'
      });
    }

    return res.status(201).json({
      data: contact,
      message: 'Contact created successfully'
    });
  }).catch((err) => {
    return res.status(400).json({
      error: err
    });
  });
}

const getAllContacts = (req, res) => {
  return models.Contact.findAll()
    .then((contacts) => {
      return res.status(200).json({
        data: contacts,
        message: 'Contact fetched successfully'
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err
      });
    });
}

const deleteContactById = (req, res) => {
  const { contactId } = req.params

  return db.Contact
    .findAll({
      where: {
        id: contactId
      }
    }).then(contact => {
      if (contact.length === 0) {
        return res.status(404).json({
          message: 'Contact not found'
        })
      }
  
      return db.Contact.destroy({
        where: {
          id: contactId
        }
      }).then(deleted => {
        return res.status(200).json({
          message: 'Contact successfully deleted',
          data: deleted
        })
      }).catch(err => {
        return status(400).json({
          message: 'Error occured during deletion',
          error: err
        })
      });
    }).catch(err => {
      return res.status(400).json({
        message: 'Error occured during search',
        error: err
      })
    });
}

const contactController = {
  createContact,
  getAllContacts,
  deleteContactById
};

export default contactController