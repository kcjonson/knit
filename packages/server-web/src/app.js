const startTime = process.hrtime();
console.log('Starting server-web ...')
require('isomorphic-fetch');  // eslint-disable-line
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import {renderToString} from 'inferno-server';
import {RouterContext, match} from 'inferno-router';
import createElement from 'inferno-create-element';
import prettyHrtime from 'pretty-hrtime';
import resolve from 'resolve';
import fs from 'fs';
import template from 'lodash.template';
import routes from '@knit/client/routes';
import storeManager from '@knit/client/core/storeManager';

import DevicesStore from '@knit/client/stores/Devices';


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



// Serve static
// This is a huge hack for now. Gotta figgure this better later.
// The goal is to not have to copy files from the client package, since thats
// more build complecity, but instead, use them in place.
let clientPublicDir = resolve.sync('@knit/client/public/index.html');
clientPublicDir = clientPublicDir.replace('/index.html', '');
app.use(serve(clientPublicDir, {index: 'null.html'})) // let inferno handle that.


// Attach router

const pageTemplatePath = resolve.sync('@knit/client/index.html')
const pageTemplate = fs.readFileSync(pageTemplatePath, 'utf8');

app.use(async (ctx, next) => {
  const renderProps = match(routes, ctx.url);
  if (renderProps.redirect) {
    return ctx.redirect(renderProps.redirect)
  }

  //storeManager.startSession('123456')

  //const DevicesStoreInstance = new DevicesStore();
  //let devicesStoreData = await DevicesStoreInstance.provision();

  const data = {
    foo: 'foo'
  }

  //console.log('dsd', devicesStoreData)

  const dataString = JSON.stringify(data);
  const dataTag = `<script type='application/json' id="initialState">${dataString}</script>`;
  const pageContents = renderToString(createElement(RouterContext, renderProps));
  const body = template(pageTemplate)({
    pageContents: pageContents,
    initialData: dataTag
  });
  ctx.body = body;
  await next();
});







app.listen(4000);


const endTime = process.hrtime(startTime)
console.log('server-web started in', prettyHrtime(endTime))
