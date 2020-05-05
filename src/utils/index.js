export const errorHandler = async (ctx,next) => { // error handler
    try {
        return await next();
    } catch (err) {
        ctx.body = { message: err.message || 'Unexpected error.' };
        ctx.status = err.status || 500;
    }
};

export const logger = async(ctx, next) => { //logger function
    let start = Date.now();
    await next();
    console.log(`${ctx.request.method} ${ctx.request.body} ${Date.now() - start} ms`);
};


// let id = 0;
// export const idGenerator = {
//     next: () => (++id)
// }

export const idGenerator = (() => {
    let id = 0; //nu e distrusa la sfarsitul codului, ci se va pastra (intr-un obiect numit closure, valoarea, pana va fi nevoie de ea)
    return {
        next: () => (++id)
    };
})(); //iie immediately executed function
