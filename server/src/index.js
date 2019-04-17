import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import { sequelize } from '../models';

import route from './routes/index';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', route);

app.get('/', (req, res) => {
  res.send({ message: 'You are welcome to SMS Manager' });
});

const eraseDatabaseOnSync = true;

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});
