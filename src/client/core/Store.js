import EventEmitter from 'events';

let manager;


// Provision with primary key
// Check with store manager singleton to see if data exists,
// Ask manager for data, can return either the data or a promise to get it

// Store manager
// - fetches data
// - provisions stores
// - communicates with request handler to hold server render until data is fetched
// - writes to cache for offline
// - ??? runs in service worker?

// Open questions
// - how is cache invalidated? does server set cache policy for client?



// Manager instances should be shared across a single user session. Or, thats
// the plan at least.

class Manager {

  constructor() {
    console.log('Store/Manager.constructor()')
    this.__cache = {}

    // TODO: If there is an existing session seed cache?

    // this.__cache = {
    //   Device: {
    //     1234: {
    //       baz: 'baz'
    //     }
    //   }
    // }


  }

  async get(store, key) {
    console.log('Store/Manager.get()', store, key)

    // TODO: Fetch from server if invalidation strategy met
    // TODO: define invalidation strategy
    // TODO: think about invalidation
    // TODO: invalidate thoughts about invalidation, and revalidate them

    let res = await fetch('http://localhost:3000/api/devices');
    let data = await res.json();


    let state = data;
    // if (this.__cache[store] && this.__cache[store][key]) {
    //   state = Object.assign({}, this.__cache[store][key]);
    // } else if (this.__cache[store]) {
    //   this.__cache[store][key] = state;
    // } else {
    //   this.__cache[store] = state;
    // }
    return state;
  }
}


export default class Store extends EventEmitter {



  constructor(props) {
    super();
    console.log('Store.constrcutor()');

    // TODO: Create a manager _per session_ Not across all user sessions! -KCJ
    if (!manager) {
      manager = new Manager();
    }

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
    console.log('setting state', newState)
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
