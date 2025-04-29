import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DigiwalletService extends Service {
  @tracked walletAmount = 0;

  get getAmount() {
    this.walletAmount = localStorage.getItem('amount');
    return this.walletAmount;
  }
  updateAmount(amt) {
    localStorage.setItem('amount', amt);
  }
}
