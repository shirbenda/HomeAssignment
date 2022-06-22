import { makeAutoObservable } from 'mobx';

export interface IClient {
  id: number;
  name: string;
}

export default class AuthStore {
  username = '';

  clients: IClient[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setUser(username: string, clients: IClient[]) {
    this.username = username;
    this.clients = clients;
  }
}
