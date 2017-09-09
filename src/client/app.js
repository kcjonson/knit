import React from 'react';
import ReactDOM from 'react-dom';

import Index from './Index';

// Snag the initial state that was passed from the server side
const initialStateNode = document.getElementById('initialState')
const initialStateHTML = initialStateNode.innerHTML;
const initialState = initialStateHTML ? JSON.parse(initialStateHTML) : {}
initialStateNode.parentNode.removeChild(initialStateNode);

ReactDOM.render(
  React.createElement(Index, initialState),
  document.getElementById('knit-app')
);
