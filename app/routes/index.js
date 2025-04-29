import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    let amount = localStorage.getItem('amount');
    return amount;
  }
}
