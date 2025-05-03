import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service digiwallet;

  model() {
    let amount = localStorage.getItem('amount');
    return amount;
  }
}
