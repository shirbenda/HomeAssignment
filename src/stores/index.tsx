import { createContext, useContext } from 'react';
import BeerStore from '@stores/beerStore';
import AuthStore from '@stores/authStore';

const StoreContext = createContext({
  beerStore: new BeerStore(),
  authStore: new AuthStore(),
});

const useStore = () => useContext(StoreContext);

export default useStore;
