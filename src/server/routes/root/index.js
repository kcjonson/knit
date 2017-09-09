import Router from 'koa-router';
import React from 'react';
import {renderToString} from 'react-dom/server';
import fs from 'fs';
import template from 'lodash.template';

// Load base of client application
import ClientIndex from '../../../client/Index';


const data = {
  foo: 'bar'
}

const dataString = JSON.stringify(data);
const dataTag = `<script type='application/json' id="initialState">${dataString}</script>`

// Load base temlate file
const pageTemplate = fs.readFileSync('./dist/client/index.html', "utf8");
const pageContents = renderToString(React.createElement(ClientIndex, data, null))

const pageString = template(pageTemplate)({
  pageContents: pageContents,
  initialData: dataTag
})


const router = new Router();

router.get('/', function (ctx, next) {
  ctx.body = pageString
});

export default router;
