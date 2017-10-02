import Router from 'koa-router';
import {renderToString} from 'inferno-server';
import createElement from 'inferno-create-element';
import fs from 'fs';
import template from 'lodash.template';
import StoreManager from '@knit/client/core/storeManager';
import resolve from 'resolve';

// Load base of client application
import ClientIndex from '@knit/client/Index';

const pageTemplatePath = resolve.sync('@knit/client/index.html')
const pageTemplate = fs.readFileSync(pageTemplatePath, 'utf8');

const applyTemplate = (data) => {
  const dataString = JSON.stringify(data);
  const dataTag = `<script type='application/json' id="initialState">${dataString}</script>`;
  const pageContents = renderToString(createElement(ClientIndex, data));
  return template(pageTemplate)({
    pageContents: pageContents,
    initialData: dataTag
  });
}

// debug code for testing delays.
//const timeout = ms => new Promise(res => setTimeout(res, ms))



// Get seed data, like URL params and such
const getData = async () => {
  //await timeout(5000);
  return {
    foo: 'foo',
    id: 1234
  }
}




const router = new Router();

router.get('/', async (ctx) => {

  // TODO: Hold send until promises are resolved

  // TODO: Map all possible client routes, not all routes since we want proper 404s
  //      from the server and not send the JS bundles for invalid routes.

  const data = await getData();
  StoreManager.startSession('12345678');
  const body = applyTemplate(data);

  ctx.body = body;


});

export default router;
