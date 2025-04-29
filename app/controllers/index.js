import Controller from '@ember/controller';

export default class IndexController extends Controller {
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
}
