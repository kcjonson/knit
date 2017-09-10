

const bind = (component, store) => {
  console.log('bind');

  const storeInstance = new store();

  let boundComponent = (args) => {
    console.log('bound component', args, storeInstance.state)

    //getStoreState(store, args.id)



    return component(Object.assign({}, storeInstance.state, args));
  }

  return boundComponent;
}

export default bind;
