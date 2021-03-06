//let manager;


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


const isBrowser = () => {
  return typeof window !== 'undefined';
}

let __stores = {};
let __cache = {};


let sessionId;


// If on server, this must be called
export const startSession = (id) => {
  console.log('storeManager.startSession', id)
  sessionId = id;
  __cache[sessionId] = {};
  __stores[sessionId] = {};
}

if (isBrowser()) {
  startSession('browser');
}

const updateCache = (storeName, key, data) => {
  if (!sessionId || !__cache[sessionId]) {
    throw new Error('session ID is undefined, unable to update cache')
  }

  if (key) {
    if (__cache[sessionId][storeName]) {
      __cache[sessionId][storeName][key] = data;
    } else {
      __cache[sessionId][storeName] = {
        [key]: data
      }
    }
  } else {
    __cache[sessionId][storeName] = data;
  }
  console.log('storeManager.updateCache', __cache)
}


export const get = async (storeName, props = {}) => {
  console.log('StoreManager.get()', storeName, sessionId, props.key)

  // TODO: Fetch from server if invalidation strategy met
  // TODO: define invalidation strategy
  // TODO: think about invalidation
  // TODO: invalidate thoughts about invalidation, and revalidate them

  console.log('cache', __cache)

  let data;

  if (__cache[sessionId] &&
      __cache[sessionId][storeName]) {
    if (!props.collection && __cache[sessionId][storeName][props.key]) {
      console.log('storeManager fetch', __cache[sessionId][storeName][props.key])
      return __cache[sessionId][storeName][props.key];
    } else if (props.collection) {
      console.log('storeManager fetch', __cache[sessionId][storeName])
      return __cache[sessionId][storeName];
    }
  }


  let url = 'http://' + props.url;
  if (props.collection === false) {
    if (!props.key) {
      throw new Error('No key value found!')
    }
    url = url + `/${props.key}`;
  }
  let res = await fetch(url);
  data = await res.json();


  if (!props.collection) {
    // if (this.__cache[store] && this.__cache[store][key]) {
    //   state = Object.assign({}, this.__cache[store][key]);
    // } else if (this.__cache[store]) {
    //   this.__cache[store][key] = state;
    // } else {
    //   this.__cache[store] = state;
    // }
  } else {
    if (!data.forEach) {
      throw new Error('Data from colleciton endpoint not iteratable');
    }

    // Take data from the collection response and add it to the cache as if
    // it were loaded by a non collection store itself.
    let collectionKeys = [];
    data.forEach(item => {
      const collectionSubStoreName = props.collection.prototype.constructor.name;
      const key = props.collection.key;
      collectionKeys.push(item[key]);
      updateCache(collectionSubStoreName, item[key], item)
    });

    updateCache(storeName, null, collectionKeys);
  }

  return data;
}


export default {
  get: get,
  startSession: startSession
}
