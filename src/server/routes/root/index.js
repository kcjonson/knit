import Router from 'koa-router';
import Inferno from 'inferno';
import {renderToString} from 'inferno-server';
import createElement from 'inferno-create-element';
import fs from 'fs';
import template from 'lodash.template';
import StoreManager from '../../../client/core/StoreManager';

// Load base of client application
import ClientIndex from '../../../client/Index';
const pageTemplate = fs.readFileSync('./dist/client/index.html', "utf8");



function applyTemplate(data) {
  const dataString = JSON.stringify(data);
  const dataTag = `<script type='application/json' id="initialState">${dataString}</script>`
  const pageContents = renderToString(createElement(ClientIndex, data))
  return template(pageTemplate)({
    pageContents: pageContents,
    initialData: dataTag
  });
}


const timeout = ms => new Promise(res => setTimeout(res, ms))

async function getData() {
  //await timeout(5000);
  return {
    foo: 'foo',
    id: 1234
  }
}




const router = new Router();

router.get('/', async(ctx) => {

  // TODO: Hold send until promises are resolved

  // TODO: Map all possible client routes, not all routes since we want proper 404s
  //      from the server and not send the JS bundles for invalid routes.



  console.log('about to send')
  const data = await getData();
  console.log('data foobar!', data)
  const body = applyTemplate(data);
  console.log('sending baz')

  ctx.body = body;


});

export default router;
