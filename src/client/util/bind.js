import React, {Component} from 'react';

class BoundComponent extends Component {

  constructor() {
    super();
    this.state = {} // State is gross, please forgive me. But I think this is
                    // preferable to using force update. -KCJ
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentWillMount() {
    //console.log('bind/BoundComponent.componentWillMount()')
    this.setState(this.props.store.state);
  }

  componentDidMount() {
    //console.log('bind/BoundComponent.componentDidMount()')
    this.props.store.on('change', this.onStoreChange)
  }

  onStoreChange(newState) {
    //console.log('bind/BoundComponent.onStoreChange()', newState)
    this.setState(newState);
  }

  render() {
    console.log('bind/BoundComponent.render()', this.state, this.props)
    const componentState = Object.assign({}, this.state, this.props.args);
    const componentInstance = this.props.componentToBind(componentState);
    return componentInstance;
  }

}


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
