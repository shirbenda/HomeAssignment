import * as React from 'react';
import SearchBar from '@components/SearchBar/SearchBar';
import BeerList from '@components/BeerList/BeerList';
import { observer } from 'mobx-react-lite';

const Home = observer(() => (
  <>
    <SearchBar />
    <BeerList />
  </>
));

export default Home;
