import Inferno from 'inferno';
import BoundComponent from '../core/BoundComponent';

const bind = (componentToBind, Store) => {
  console.log('bind.bind()');

  let boundComponent = (props) => {

    // warning: store instance may have its state unresolved
    return <BoundComponent componentToBind={componentToBind}
        Store={Store}
        parentProps={props} />

  }

  return boundComponent;
}

export default bind;
