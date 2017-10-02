import Inferno from 'inferno';



const Home = (props = {}) => {
  console.log('Home.render()', props);
  return <div className='Home'>Welcome to Home</div>
}

// Index.propTypes = {
//   devices: PropTypes.array
// }

export default Home;
