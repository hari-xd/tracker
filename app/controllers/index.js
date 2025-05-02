import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class IndexController extends Controller {
  @service flashMessages;
  @tracked totalamount = 0;
  subscriptionsCount() {
    let data = JSON.parse(localStorage.getItem('data'));
    let count = 0;

    data.forEach((dat) => {
      if (dat) {
        if (dat.subscriptionStatus == 'active') {
          count = count + 1;
        }
      }
    });
    return count;
  }

  subscriptionsCharge() {
    let data = JSON.parse(localStorage.getItem('data'));
    let sum = 0;
    data.forEach((dat) => {
      if (dat) {
        if (dat.subscriptionStatus == 'active') {
          console.log(dat.price);
          sum = sum + parseInt(dat.subscriptionPrice);
        }
      }
    });
    console.log(sum);
    return sum;
  }

  getTotalAmount() {
    this.totalamount = localStorage.getItem('totalAmount');
    return this.totalamount;
  }
}
