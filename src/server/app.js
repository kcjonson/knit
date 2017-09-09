const startTime = process.hrtime();
console.log('Starting server ...')


import Koa from 'koa';
import prettyHrtime from 'pretty-hrtime';
import router from './Router';

// Koa app creation;
const app = new Koa();

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});


// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// Attach router
app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);


const endTime = process.hrtime(startTime)
console.log('Server started in', prettyHrtime(endTime))
