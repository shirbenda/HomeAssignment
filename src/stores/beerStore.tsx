import { makeAutoObservable } from 'mobx';

export interface IBeer {
  id: number,
  name: string,
  image_url: string,
  food_pairing: string[],
  description: string,
  abv: string,
  ibu: string,
}

export interface IBeerWithRank extends IBeer {
  rank?:number,
}
export default class BeerStore {
  favorites:IBeerWithRank[] = [];

  food = '';

  modalBeer:IBeer | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  findFavorite(beerId:number) {
    return this.favorites.findIndex((beer) => beer.id === beerId);
  }

  setRank(beerId:number, rank: number) {
    this.favorites[this.findFavorite(beerId)].rank = rank;
  }

  addFavorite(beer:IBeerWithRank) {
    this.favorites.push(beer);
  }

  deleteFavorite(beerId:number) {
    const beerIndexAtId = this.findFavorite(beerId);
    if (beerIndexAtId > -1) {
      this.favorites.splice(beerIndexAtId, 1);
    }
  }

  clearFavorites() {
    this.favorites = [];
  }

  setFood(value: string) {
    this.food = value;
  }

  setModalBeer(beer:IBeer) {
    this.modalBeer = beer;
  }

  unsetModalBeer() {
    this.modalBeer = null;
  }
}
