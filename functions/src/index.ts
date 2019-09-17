import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import * as serviceAccount from './serviceAccount.json';

// @ts-ignore
const serviceKey = <AppOptions.credential>serviceAccount;

firebase.initializeApp({
  credential: firebase.credential.cert(serviceKey),
});

const app = express();

app.use(
  cors({
    origin: ['https://localhost:8080'],
  }),
);

app.get('/ping', (req, res) => {
  res.send('ping!');
});

exports.app = functions.https.onRequest(app);
