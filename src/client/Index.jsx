import Inferno from 'inferno';
import PropTypes from 'prop-types';
import bind from './util/bind';
import DeviceStore from './stores/Device';
import DevicesStore from './stores/Devices';

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


Auto hydrate and cancel fetch?


// FUTURE: Specify which props should be copied to the store other than just the key

*/

const Device = bind(({name, last_updated, id}) => {
  console.log('Device.render()', name, last_updated, id);
  return <div className='Device'>{name}</div>
}, DeviceStore);

const Devices = bind(props => {
  console.log('Devices.render()', props);
  const devicesData = props.Devices || []
  const deviceComponents = devicesData.map((deviceData) => {
    return <Device key={deviceData.id} {...deviceData} />
  })

  return <div className='Devices'>Hello from index {deviceComponents}</div>
}, DevicesStore);


const Index = (props = {}) => {
  console.log('Index.render()', props);
  return <div className='Index'>
    <Devices homeId={props.id} />
  </div>
}

// Index.propTypes = {
//   devices: PropTypes.array
// }

export default Index;
