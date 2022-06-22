import * as React from 'react';
import { useState } from 'react';
import useStore from '@src/stores';
import './SearchBar.scss';

function SearchBar() {
  const { beerStore } = useStore();
  const { food } = beerStore;
  const [query, setQuery] = useState(food);

  function search(value: string) {
    setQuery(value);
    beerStore.setFood(value);
  }

  return (
    <label htmlFor="query" className="searchBar">
      Food Pairing
      <input type="text" id="query" onChange={(e) => search(e.target.value)} value={query} />
    </label>
  );
}

export default SearchBar;
