import Inferno from 'inferno';
//import createElement from 'inferno-create-element';
import {Router} from 'inferno-router';
import routes from './routes';
import createBrowserHistory from 'history/createBrowserHistory';
const browserHistory = createBrowserHistory();


// Snag the initial state that was passed from the server side
let initialState;
const initialStateNode = document.getElementById('initialState')
if (initialStateNode) {
  const initialStateHTML = initialStateNode.innerHTML;
  initialState = initialStateHTML ? JSON.parse(initialStateHTML) : {}
  initialStateNode.parentNode.removeChild(initialStateNode);
}

Inferno.render(
  <Router history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('knit-app')
);
