import Router from 'koa-router';
import {broadcast} from '../core';
import {ActivityStore} from "./activityStore";

const fs = require('fs');

export const router = new Router();

const items = new ActivityStore();

router.get('/sample', async (ctx, next) => {
    console.log("sample");
    let data = fs.readFileSync('db\\Glasul_florilor.musicxml', 'utf8');
    ctx.response.body = data.toString();
    // ctx.response.body = {"data": data.toString()};
    ctx.response.status = 200; // ok
    console.log(ctx.response.body);
    console.log(200);
});

// router.get('/:id', async (ctx, next) => {
//     const id = parseInt(ctx.params.id);
//     const item = await items.findOne(id);
//     if (item) {
//         ctx.response.body = item;
//         ctx.response.status = 200;
//     } else {
//         ctx.response.status = 404;
//     }
// });

// router.post('/', async (ctx, next) => {
//     const item = ctx.request.body; //luam item trimis de client
//     console.log(item);
//     const insertedItem = await items.insert(item);
//     ctx.response.body = insertedItem;
//     ctx.response.status = 200;
//     broadcast(insertedItem);
// });
//
// router.put('/:id', async (ctx, next) => {
//     const item = ctx.request.body;
//     console.log(item);
//     const id = parseInt(ctx.params.id);
//     items.update({id: id}, item);
//     const newItem = await items.findOne(id);
//     ctx.response.body = newItem;
//     ctx.response.status = 200;
//     broadcast(newItem);
// });
//
// // delete item by id
// router.delete('/:id', async (ctx, next) => {
//     const id = parseInt(ctx.params.id);
//     await items.remove({id: id}).then((result) => {
//         ctx.response.body = "Item was successfully deleted";
//         ctx.response.status = 200;
//         broadcast([]);
//     }).catch((reject) => {
//         ctx.response.status = 400;
//         ctx.response.body = reject;
//     })
//
// });
//
// // delete item from request body
// router.delete('/', async (ctx, next) => {
//     const props = ctx.request.body;
//     await items.remove(props).then((result) => {
//         ctx.response.status = 200;
//         ctx.response.body = '{"text": "Deleted succesfully"}';
//         broadcast([])
//     })
//         .catch((reject) => {
//             ctx.response.status = 400;
//             ctx.response.body = reject;
//         })
// });

export default router;
