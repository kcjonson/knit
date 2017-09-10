import React, {PropTypes} from 'react';
import bind from './util/bind';
import Device from './stores/Device';

/*
const Index = bind(({foo, bar}) => {
  return (<div>Hello from index {foo} {bar}</div>)
}, Device);  // Default key is "id"

const Index = bind(({foo, bar}) => {
  return (<div>Hello from index {foo} {bar}</div>)
}, {
  Device, // Will use 'id' as key by default
  User: 'userId', // Uses the "userId" prop as the key
  actionsData: {
    store: Actions, // Incomming props will be passed in as "actionsData"
    key: 'actionsId',
  },
}
}
});


*/

const Index = bind(({foo, bar}) => {
  return (<div>Hello from index {foo} {bar}</div>)
}, Device);

export default Index;
