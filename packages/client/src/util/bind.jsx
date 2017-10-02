import Inferno from 'inferno';
import BoundComponent from '../core/BoundComponent';

const bind = (componentToBind, store) => {
  console.log('bind.bind()');

  const storeInstance = new store();

  // Has this component been initially provisioned?
  // We'll do this automatically the first time, but its manual after that
  let provisioned = false;

  let boundComponent = (args) => {

    // The key comes from props given to the _component_. This is a bit weird,
    // since the componet doesn't have direct access to the store. The store will
    // automatically provision the first time the key is set.
    const key = storeInstance.key;
    storeInstance.state = {[key]: args[key]}
    if (!provisioned) {
      // This is an async call, but we can't await and block the render chain.
      // the store will update the state later via an event
      storeInstance.provision();

      provisioned = true;  // Doesn't guarentee that
    }

    // warning: store instance may have its state unresolved
    return <BoundComponent componentToBind={componentToBind}
      store={storeInstance}
      args={args} />

  }

  return boundComponent;
}

export default bind;
