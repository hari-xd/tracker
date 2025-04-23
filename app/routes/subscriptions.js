import Route from '@ember/routing/route';

export default class SubscriptionsRoute extends Route {
  async model() {
    let response = await fetch('assets/data/subscriptions.json');
    let data = JSON.parse(localStorage.getItem('data'));

    localStorage.setItem('data', JSON.stringify(data));
    return data;
  }
}
