import Store from '../core/Store';
import Device from './Device';

export default class Devices extends Store {

  url = 'localhost:3000/api/devices';
  collection = Device;

}
