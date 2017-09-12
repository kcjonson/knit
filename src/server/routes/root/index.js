import Router from 'koa-router';
import React from 'react';
import {renderToString} from 'react-dom/server';
import fs from 'fs';
import template from 'lodash.template';

// Load base of client application
import ClientIndex from '../../../client/Index';
const pageTemplate = fs.readFileSync('./dist/client/index.html', "utf8");



function applyTemplate(data) {
  const dataString = JSON.stringify(data);
  const dataTag = `<script type='application/json' id="initialState">${dataString}</script>`
  const pageContents = renderToString(React.createElement(ClientIndex, data, null))
  return template(pageTemplate)({
    pageContents: pageContents,
    initialData: dataTag
  });
}




const router = new Router();

router.get('/', (ctx) => {

  // TODO: Hold send until promises are resolved

  // TODO: Map all possible client routes, not all routes since we want proper 404s
  //      from the server and not send the JS bundles for invalid routes.
  const data = {
    foo: 'foo',
    id: 1234
  }

  const body = applyTemplate(data);


  ctx.body = body;
});

export default router;
