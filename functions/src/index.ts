import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import * as serviceAccount from './serviceAccount.json';
import { SessionsClient } from 'dialogflow';

// @ts-ignore
const serviceKey = <AppOptions.credential>serviceAccount;

firebase.initializeApp({
  credential: firebase.credential.cert(serviceKey),
});

const app = express();

app.use(
  cors({
    origin: ['https://localhost:8080', 'https://mickjasker.dev'],
  }),
);

app.get('/ping', (req, res) => {
  res.send('ping!');
});

app.post('/message', async (req, res) => {
  const { queryInput, sessionId } = req.body;
  const sessionClient = new SessionsClient({ credentials: serviceAccount });
  const session = sessionClient.sessionPath('porfolio-bot-ipwpmm', sessionId);
  sessionClient
    .detectIntent({ session, queryInput })
    .then(responses => {
      res.send(responses[0].queryResult);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

exports.app = functions.https.onRequest(app);
