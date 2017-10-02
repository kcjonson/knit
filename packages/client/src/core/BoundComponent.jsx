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
    //console.log('bind/BoundComponent.componentWillMount()')
    this.setState(this.props.store.state);
  }

  componentDidMount() {
    //console.log('bind/BoundComponent.componentDidMount()')
    this.props.store.on('change', this.onStoreChange)
  }

  onStoreChange(newState) {
    console.log('bind/BoundComponent.onStoreChange()', newState)
    this.setState(newState);
  }

  render() {
    //console.log('bind/BoundComponent.render()', this.state, this.props.args);
    const componentProps = Object.assign({}, this.state, this.props.args);
    return this.props.componentToBind(componentProps);
  }

}
