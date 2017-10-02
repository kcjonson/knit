import Inferno from 'inferno';
import {Route, IndexRoute} from 'inferno-router';
import App from '../components/App';
import NotFound from './NotFound';
import Home from './Home';
import Devices from './Devices';


const routes = <Route component={App}>
    <IndexRoute component={Home} />
    <Route path="devices" component={Devices} />
    <Route path="*" component={NotFound} />
  </Route>


export default routes;
