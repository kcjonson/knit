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

let __cache = {};


export async function get(store, key) {
  console.log('StoreManager.get()', store, key)

  // TODO: Fetch from server if invalidation strategy met
  // TODO: define invalidation strategy
  // TODO: think about invalidation
  // TODO: invalidate thoughts about invalidation, and revalidate them

  let data;

  if (typeof window === 'undefined') {
    let res = await fetch('http://localhost:3000/api/devices');
    data = await res.json();
  }

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

export async function set() {

}

export default {
  get: get,
  set: set
}
