import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class WalletRoute extends Route {
  @service digiwallet;
  model() {
    this.digiwallet.getamount();
    let amount = localStorage.getItem('amount');
    console.log(amount)
    return amount;
  }
}
