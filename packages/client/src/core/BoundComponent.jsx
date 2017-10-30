/* eslint-disable inferno/require-optimization */
import Component from 'inferno-component';

export default class BoundComponent extends Component {

  constructor() {
    console.log('bind/BoundComponent.constructor()')
    super();
    this.state = {} // State is gross, please forgive me. But I think this is
                    // preferable to using force update. -KCJ
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentWillMount() {
    console.log('bind/BoundComponent.componentWillMount()')

    // The key comes from props given to the _component_. This is a bit weird,
    // since the componet doesn't have direct access to the store. The store will
    // automatically provision the first time the key is set. However, only the
    // store knows what key it needs, so all the props go in
    this.__storeInstance = new this.props.Store(this.props.parentProps);

    // This is an async call, but we can't await and block the render chain.
    // the store will update the state later via an event
    this.__storeInstance.provision().catch(err => {
      console.error(err)
    })

    this.setState(this.__storeInstance.state);
  }

  componentDidMount() {
    //console.log('bind/BoundComponent.componentDidMount()')
    this.__storeInstance.on('change', this.onStoreChange)
  }

  onStoreChange(newState) {
    console.log('bind/BoundComponent.onStoreChange()', newState)
    this.setState(newState);
  }

  render() {
    console.log('bind/BoundComponent.render()', this.state, this.props.parentProps);
    const componentProps = Object.assign({}, this.state, this.props.parentProps);
    return this.props.componentToBind(componentProps);
  }

}
