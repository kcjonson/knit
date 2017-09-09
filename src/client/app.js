import React from 'react';
import ReactDOM from 'react-dom';

import Index from './Index';

const data = {
  foo: 'foo',
}

ReactDOM.render(
  React.createElement(Index, data, null),
  document.getElementById('app')
);
