const startTime = process.hrtime();
console.log('Starting server-web ...')
require('isomorphic-fetch');  // eslint-disable-line
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import prettyHrtime from 'pretty-hrtime';
import router from './Router';
import resolve from 'resolve';

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

// Serve static
// This is a huge hack for now. Gotta figgure this better later.
// The goal is to not have to copy files from the client package, since thats
// more build complecity, but instead, use them in place.
let clientPublicDir = resolve.sync('@knit/client/public/index.html');
clientPublicDir = clientPublicDir.replace('/index.html', '');
app.use(serve(clientPublicDir))

app.listen(4000);


const endTime = process.hrtime(startTime)
console.log('server-web started in', prettyHrtime(endTime))
