import Inferno from 'inferno';
import createElement from 'inferno-create-element';
import Index from './Index';

// Snag the initial state that was passed from the server side
let initialState;
const initialStateNode = document.getElementById('initialState')
if (initialStateNode) {
  const initialStateHTML = initialStateNode.innerHTML;
  initialState = initialStateHTML ? JSON.parse(initialStateHTML) : {}
  initialStateNode.parentNode.removeChild(initialStateNode);
}

Inferno.render(
  createElement(Index, initialState),
  document.getElementById('knit-app')
);
