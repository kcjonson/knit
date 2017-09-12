import React from 'react';
import PropTypes from 'prop-types';
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

// FUTURE: Specify which props should be copied to the store other than just the key

*/

const Devices = bind(({devices = []}) => {
  console.log('Devices.render()', devices);
  const deviceComponents = devices.map((device) => {
    return <div className='device' key={device.id}>{device.name}</div>
  })

  return (<div className='Devices'>Hello from index {deviceComponents}</div>)
}, Device);



const Index = () => {
  console.log('Index.render()');
  return (<div className='Index'><Devices id='1234'/></div>)
}

Index.propTypes = {
  devices: PropTypes.array
}

export default Index;
