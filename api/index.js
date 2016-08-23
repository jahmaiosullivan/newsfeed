import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../config';
import * as actions from './actions/index';
import {mapUrl} from '../utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import sequelizeTables from './database/models';
import configureAuth from './configureAuth';
import expressJWT from 'express-jwt';
import schema from './graphql/schema';
import expressGraphQL from 'express-graphql';
import busboy from 'connect-busboy';
import fs from 'fs';
import util from 'util';

const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);
const io = new SocketIo(server);
const jwtAuth = expressJWT({ secret: config.auth.jwt.secret, credentialsRequired: false});
io.path('/ws');

app.use(session({
  secret: config.auth.jwt.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(busboy());
app.use(jwtAuth.unless({path: [/\/auth/i,  /\/graphql/i, /\/facebook/i ] }));
app.use(session(Object.assign({}, {
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400 }
}, jwtAuth)));

configureAuth(app, config);

app.use('/graphql', jwtAuth, expressGraphQL((req) => {
  if (!req.user) {
    console.log(`are you authorized for graphql?`);
  }
  return {
    schema,
    graphiql: true,
    rootValue : {request: req},
    context: req.session,
    pretty: true
  };
}));

app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const {action, params} = mapUrl(actions, splittedUrlPath);
  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});

/***** Create a uploads directory if none exists. This is for uploading files to Azure and other services. ****/
if (!fs.existsSync(config.uploadsDir)){
  fs.mkdirSync(config.uploadsDir);
}

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (!config.apiPort)  {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
else {
  sequelizeTables.sync({force: false}).catch(err => console.error(err.stack)).then(() => {
    const runnable = app.listen(config.apiPort, (err) => {
      if (err) {
        console.error(err);
      }
      console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
      console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
    });

    io.on('connection', (socket) => {
      socket.emit('news', {msg: `'Hello World!' from server`});

      socket.on('history', () => {
        for (let index = 0; index < bufferSize; index++) {
          const msgNo = (messageIndex + index) % bufferSize;
          const msg = messageBuffer[msgNo];
          if (msg) {
            socket.emit('msg', msg);
          }
        }
      });

      socket.on('msg', (data) => {
        data.id = messageIndex;
        messageBuffer[messageIndex % bufferSize] = data;
        messageIndex++;
        io.emit('msg', data);
      });
    });
    io.listen(runnable);
  });
}