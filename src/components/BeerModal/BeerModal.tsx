import * as React from 'react';
import useStore from '@src/stores';
import { observer } from 'mobx-react-lite';
import { IBeer } from '@stores/beerStore';
import './BeerModal.scss';

const BeerModal = observer(({ beer }:{beer: IBeer }) => {
  const { beerStore } = useStore();

  function closeModal() {
    beerStore.unsetModalBeer();
  }
  const {
    name,
    image_url: imageUrl,
    description,
    abv,
    ibu,
  } = beer;
  return (
    <div className="modal">
      <div className="description">
        <h1>{name}</h1>
        <p>{description}</p>
        <span>
          {`abv: ${abv}`}
        </span>
        <span>
          {`ibu: ${ibu}`}
        </span>
      </div>
      <img src={imageUrl} alt={name} />
      <button type="button" onClick={closeModal}>X</button>
    </div>
  );
});

export default BeerModal;
