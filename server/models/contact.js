const contact = (sequelize, DataTypes) => {
  const Contact = sequelize.define('contact', {
    name: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING, unique: true },
  });

  Contact.associate = models => {
    Contact.hasMany(models.Message, {
      foreignKey: 'senderId',
      as: 'senderMessages',
    });
    Contact.hasMany(models.Message, {
      foreignKey: 'receiverId',
      as: 'receiverMessages',
    });
  }

  return Contact;
}

export default contact;