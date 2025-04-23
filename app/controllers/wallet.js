import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class WalletController extends Controller {
  @tracked addMoneyClicked = false;
  @tracked amount = localStorage.getItem('amount');
  @tracked paymentType = '';
  @tracked upamount = 0;

  @action
  addMoney() {
    this.addMoneyClicked = !this.addMoneyClicked;
  }

  @action
  updateAmount() {
    this.upamount = parseInt(event.target.value);
  }

  @action
  updatePaymentType() {
    this.paymentType = event.target.value;
    return this.paymentType;
  }

  @action
  submitAmount() {
    console.log(this.upamount);
    console.log(this.amount);
    this.amount = parseInt(this.amount) + parseInt(this.upamount);
    console.log(this.amount);
    localStorage.setItem('amount', this.amount);
    return this.amount;
  }
}
