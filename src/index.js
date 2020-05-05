import Koa from 'koa';
import {errorHandler, logger} from './utils';
import bodyParser from 'koa-bodyparser';
import WebSocket from 'ws';
import {init} from './core';
import cors from '@koa/cors';
import Router from 'koa-router';
import itemRouter from './item/activityRouter'
import {jwtConfig, router as authRouter} from './auth';
import jsonWebToken from 'jsonwebtoken'
import jwt from "koa-jwt";


const app = new Koa();
const server = require('http').createServer(app.callback());
const wss = new WebSocket.Server({server});
init(wss);
app.use(cors());
wss.on('connection', ws => {
    console.log('Client connected!');
    ws.on('message', message => {
        console.log('received: %s', message);
        const { token }  = JSON.parse(message);
        try{
            var decoded = jsonWebToken.verify(token, jwtConfig.secret);
            console.log('decoded: ',decoded);
            ws.user=decoded;


        } catch (err) {
            console.log("jwt error")
            console.error(err);
        }
    });
});

app.use(bodyParser());

let count = 0;
app.use(logger);
app.use(errorHandler);

// const prefix = '/music';

const publicRouter = new Router();
publicRouter
    .use('/score', itemRouter.routes());
app
    .use(publicRouter.routes())
    .use(publicRouter.allowedMethods());

server.listen(3000);

