import EventEmitter from 'events';
import manager from './storeManager';


export default class Store extends EventEmitter {



  constructor(props= {}) {
    super();
    console.log('Store.constrcutor()', props);

    // Dont access __state directly or I'll cut off your hands. Use the getter/setter. -KCJ

    if (this.collection) {
      this.__state = {};
    } else {
      this.__state = {
        [this.key]: props[this.key]
      }
    }
  }

  url = null; // The base url to call

  key = 'id'; // default key is "id", can be overidden this is not the key itself
              // but the property on the state that holds the key value.
              // confusing, maybe I should rename it. -KCJ

  collection = false; // Is this a collection of objects? Collections won't send
                      // a key to the server since they're fetching a list.
                      // set to the name of a store such as "device"



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
  async provision() {
    const keyValue = this.state[this.key];
    const name = this.constructor.name;
    console.log('Store.provision()', name, keyValue);
    await manager.get(name, {
      key: keyValue,
      collection: this.collection,
      url: this.url
    }).then((state) => {
      if (this.collection === false) {
        this.state = state;
      } else {
        this.state = {[this.constructor.name]: state}
      }
      return this.state;
    });
  }

}
