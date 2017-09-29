const startTime = process.hrtime();
console.log('Starting server-api ...')
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import prettyHrtime from 'pretty-hrtime';
import router from './Router';
import cors from 'koa2-cors';

// Koa app creation;
const app = new Koa();
app.use(bodyParser());
app.use(cors())

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


app.listen(3000);


const endTime = process.hrtime(startTime)
console.log('server-api started in', prettyHrtime(endTime))
