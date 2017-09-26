import EventEmitter from 'events';
import manager from './storeManager';


export default class Store extends EventEmitter {



  constructor(props) {
    super();
    console.log('Store.constrcutor()');


    // TODO: Think more about if stores can lazily register on get/set or if
    //       they should be registered up front. For now, lets do lazy. -KCJ
    // manager.register(this.constructor.name);

    // Dont access this directly or I'll cut off your hands. Use the getter/setter. -KCJ
    this.__state = {};
  }

  key = 'id'; // default key is "id", can be overidden this is not the key itself
              // but the property on the state that holds the key value.
              // confusing, maybe I should rename it. -KCJ


  // set the state of the store
  // calls to set state will overide state that is fetched from the manager
  set state(newState) {
    //console.log('Store.setState()', newState)
    Object.assign(this.__state, newState);
    this.emit('change', this.__state);
  }

  get state() {
    // FUTURE: look into immutable.js
    let immutableState = Object.assign({}, this.__state);
    Object.freeze(immutableState);
    return immutableState;
  }

  // pull state from the manager
  // Is this even a valid case to use generators? Fuck, I don't know, if someone
  // reads this let me know if I'm just being silly, I have no idea ... -KCJ
  provision() {
    const key = this.state[this.key];
    const name = this.constructor.name;
    console.log('Store.provision()', name, key);
    this.state = manager.get(name, key).then((state) => {
      this.state = state;
    })
  }

}
