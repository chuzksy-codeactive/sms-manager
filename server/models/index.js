import Sequelize from 'sequelize';

const dbURL = process.env.NODE_ENV === 'development' ? process.env.DB_DEV : process.env.DB_PROD;

const sequelize = new Sequelize(
  dbURL, {
    dialect: 'postgres'
  },
);

const models = {
  Contact: sequelize.import('./contact'),
  Message: sequelize.import('./sms'),
};

Object.keys(models).forEach(key => {
  if('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;