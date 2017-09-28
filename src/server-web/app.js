const startTime = process.hrtime();
console.log('Starting server ...')
require('isomorphic-fetch');
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import prettyHrtime from 'pretty-hrtime';
import router from './Router';

// Koa app creation;
const app = new Koa();
app.use(bodyParser());

//x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});


//logger
app.use(async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.url} - recieved`);
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});


// Attach router
app.use(router.routes());
app.use(router.allowedMethods());

//Serve static
app.use(serve('public'))

app.listen(4000);


const endTime = process.hrtime(startTime)
console.log('Server started in', prettyHrtime(endTime))
