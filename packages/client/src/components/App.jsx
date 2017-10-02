import Inferno from 'inferno';

const App = ({children}) => {
  console.log('App.render()');
  return <div className='App'>Hello{children}</div>
}

export default App;
