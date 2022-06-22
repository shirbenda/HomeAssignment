import * as React from 'react';
import { useEffect, useState } from 'react';
import useStore from '@src/stores';
import { observer } from 'mobx-react-lite';
import { IBeer, IBeerWithRank } from '@stores/beerStore';
import BeerModal from '@components/BeerModal/BeerModal';
import { ITEMS_PER_PAGE, MAX_ITEMS } from '@src/constants';
import BeerItem from '../BeerItem/BeerItem';
import './BeerList.scss';

interface IErrorType {
    message: string
}

const BeerList = observer(({ isShowOnlyFavorites = false }: { isShowOnlyFavorites?: boolean}) => {
  const [error, setError] = useState<IErrorType | null>(null);
  const [pageOffset, setPageOffset] = useState<number>(1);
  // eslint-disable-next-line max-len
  const [isLoaded, setIsLoaded]: [boolean, (isLoaded: boolean) => void] = React.useState<boolean>(false);
  // eslint-disable-next-line max-len
  const [beers, setBeers]: [IBeerWithRank[], (beers: IBeerWithRank[]) => void] = useState<IBeerWithRank[]>([]);
  const { beerStore } = useStore();
  const { favorites, food, modalBeer } = beerStore;
  const foodQueryString = food ? `&food=${food.replace(/\s+/g, '_')}` : '';
  const MIN_PAGE_OFFSET = 1;
  const MAX_PAGE_OFFSET = Math.floor(MAX_ITEMS / ITEMS_PER_PAGE);
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://api.punkapi.com/v2/beers?page=${pageOffset}&per_page=${ITEMS_PER_PAGE}${foodQueryString}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBeers(result.map((beer:IBeer) => {
            const beerWithRank:IBeerWithRank = beer;
            beerWithRank.rank = 0;
            return beerWithRank;
          }));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, [pageOffset, food]);

  function updateOffset(number: number) {
    setIsLoaded(false);
    setPageOffset(Math.min(Math.max(1, pageOffset + number), MAX_PAGE_OFFSET));
  }
  function PaginationButton(
    { text, number, disabled }:{text: string, number: number, disabled: boolean},
  ) {
    return (
      <button
        className="button"
        type="button"
        {...{ disabled }}
        onClick={() => {
          updateOffset(number);
        }}
      >
        {text}
      </button>
    );
  }

  function Pagination() {
    return (
      <nav className="pagination">
        <PaginationButton text="Prev" number={-1} disabled={(pageOffset <= MIN_PAGE_OFFSET)} />
        <PaginationButton text="Next" number={1} disabled={(pageOffset >= MAX_PAGE_OFFSET)} />
      </nav>
    );
  }
  function printBeers() {
    const beersPointer = isShowOnlyFavorites ? favorites : beers;

    return beersPointer.map((item) => (
      <li key={item.id}>
        <BeerItem
          beer={item}
          isChecked={beerStore.findFavorite(item.id) > -1}
          isShowRankBar={isShowOnlyFavorites}
        />
      </li>
    ));
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  } if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {!isShowOnlyFavorites && <Pagination />}
      <ul className="beersList">
        {printBeers()}
      </ul>
      {modalBeer && <BeerModal beer={modalBeer} />}
    </>
  );
});

export default BeerList;
