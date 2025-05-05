import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class IndexController extends Controller {
  @service flashMessages;
  @service digiwallet;
  @tracked walletAmount = 0;

  @tracked totalamount = 0;
  @tracked trasact = [];

  constructor(...args) {
    super(...args);
    this.getWalletAmount();
    this.subscriptionsCount();
    this.subscriptionsCharge();
    this.getTotalAmount();
  }
  subscriptionsCount() {
    let data = JSON.parse(localStorage.getItem('data')) || [];
    let count = 0;

    if (data) {
      data.forEach((dat) => {
        if (dat) {
          if (dat.subscriptionStatus == 'active') {
            count = count + 1;
          }
        }
      });
    }
    return count;
  }

  subscriptionsCharge() {
    let data = JSON.parse(localStorage.getItem('transactions'));
    let sum = 0;
    if (data) {
      data.forEach((dat) => {
        if (dat) {
          if (dat.subscriptionStatus == 'active') {
            console.log(dat.price);
            sum = sum + parseInt(dat.subscriptionPrice);
          }
        }
      });
    }
    console.log(sum);
    return sum;
  }

  getTotalAmount() {
    this.totalamount = localStorage.getItem('totalAmount') || 100;
    localStorage.setItem('totalAmount', this.totalamount);
    return this.totalamount;
  }

  getWalletAmount() {
    this.walletAmount = this.digiwallet.walletAmount || 100;
    localStorage.setItem('amount', this.walletAmount);
    return this.walletAmount;
  }
}
