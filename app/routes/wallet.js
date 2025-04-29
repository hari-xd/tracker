import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class WalletRoute extends Route {
  @service digiwallet;
  model() {
    let amount = this.digiwallet.getAmount;
    
    console.log('route', amount);
    return amount;
  }
}
