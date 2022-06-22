import * as React from 'react';
import BeerList from '@components/BeerList/BeerList';
import { observer } from 'mobx-react-lite';
import useStore from '@src/stores';
import './Favorites.scss';

const Favorites = observer(() => {
  const { beerStore } = useStore();
  function removeAllBeers() {
    if (window.confirm('Are you sure?')) {
      beerStore.clearFavorites();
    }
  }
  return (
    <div className="favoritesPage">
      <h2>Favorites Beers</h2>
      <button type="button" className="button" onClick={removeAllBeers}>Remove All</button>
      {beerStore.favorites.length > 0 ? <BeerList isShowOnlyFavorites /> : <p>No favorites yet</p>}
    </div>
  );
});

export default Favorites;
