import React from 'react';
import ReactDOM from 'react-dom';

import Index from './Index';

// Snag the initial state that was passed from the server side
let initialState;
const initialStateNode = document.getElementById('initialState')
if (initialStateNode) {
  const initialStateHTML = initialStateNode.innerHTML;
  initialState = initialStateHTML ? JSON.parse(initialStateHTML) : {}
  initialStateNode.parentNode.removeChild(initialStateNode);
}

ReactDOM.render(
  React.createElement(Index, initialState),
  document.getElementById('knit-app')
);
