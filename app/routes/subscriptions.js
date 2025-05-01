import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class SubscriptionsRoute extends Route {
  @service digiwallet;

  constructor(...args) {
    super(...args);
    this.digiwallet.loadInitialTable();
  }

  async model() {
    // let response = await fetch('assets/data/subscriptions.json');
    // // let data = JSON.parse(localStorage.getItem("data"));
    // let data = await response.json();
    // localStorage.setItem('data', JSON.stringify(data));
    // // // console.log(typeof(JSON.parse(localStorage.getItem("data"))[0]));
    // return data;
  }
}
