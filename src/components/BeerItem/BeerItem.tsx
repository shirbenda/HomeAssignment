import * as React from 'react';
import { useState } from 'react';
import useStore from '@src/stores';
import { observer } from 'mobx-react-lite';
import { IBeerWithRank } from '@stores/beerStore';
import './BeerItem.scss';

const BeerItem = observer(({
  beer, isChecked, isShowRankBar,
}:{beer:IBeerWithRank, isChecked:boolean, isShowRankBar:boolean}) => {
  const { beerStore } = useStore();
  const [isStar, setIsStar] = useState<boolean>(isChecked);
  const [rank, setRank] = useState<number | undefined>(beer.rank);
  function toggleFavorites(id:number, isChecked:boolean) {
    if (isChecked) {
      beerStore.addFavorite(beer);
    } else {
      beerStore.deleteFavorite(beer.id);
    }
  }

  return (
    <button
      className="beerItem"
      type="button"
      onClick={
            () => { beerStore.setModalBeer(beer); }
        }
    >
      <label
        htmlFor={`favoriteButton${beer.id}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <input
          type="checkbox"
          id={`favoriteButton${beer.id}`}
          checked={isStar}
          onChange={(e) => {
            setIsStar(!isStar);
            toggleFavorites(
              beer.id,
              e.target.checked,
            );
          }}
        />
        <span className="entypo-heart" />
        <h3>{beer.name}</h3>
      </label>
      <img src={beer.image_url} alt={beer.name} />

      {isShowRankBar && (
      <div className="inputRangeWrapper">
        <input
          id="input"
          type="range"
          min="0"
          value={rank}
          max="5"
          step="1"
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            const rank = +e.target.value;
            beerStore.setRank(beer.id, rank);
            setRank(rank);
          }}
          list="steplist"
        />
        <datalist id="steplist">
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </datalist>
      </div>
      )}
    </button>
  );
});

export default BeerItem;
