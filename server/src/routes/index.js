import express from 'express';
import contact from './contact';
import sms from './sms';

const app = express();

app.use(contact);
app.use(sms);

export default app;