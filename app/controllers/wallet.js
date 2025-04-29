import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class WalletController extends Controller {
  @service digiwallet;

  @tracked addMoneyClicked = false;
  @tracked amount = this.digiwallet.getAmount;
  // @tracked amount = 100;

  @tracked paymentType = '';
  @tracked upamount = 0;

  @tracked transactions = [];

  addMoneyTransaction(){
    localStorage.setItem (
      'transactions',
      JSON.stringify(this.transactions),
    );
    this.transactions = JSON.parse(localStorage.getItem('transactions'));
    this.transactions[this.transactions.length] = {
      subscriptionName:"Amount Credited",
      subscriptionType:"profile",
      paymentMethod:"Debit",
      subscriptionStatus:'expired',
      balance: this.amount,
      subscriptionPrice:parseInt(this.upamount),
    };
    console.log(this.transactions);
    localStorage.setItem (
      'transactions',
      JSON.stringify(this.transactions),
    );
  }
  constructor(...args) {
    super(...args);
    this.loadInitialAmount();
  }
  loadInitialAmount() {
    // this.amount = localStorage.getItem('amount');
    this.amount = this.digiwallet.getAmount;
    console.log('conteoll', this.amount);
  }

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
    this.amount = parseInt(this.amount) + parseInt(this.upamount);
    this.digiwallet.updateAmount(this.amount);
    localStorage.setItem('amount', this.amount);
    
    this.addMoneyTransaction();
    this.addMoneyClicked = false;
    return this.amount;
  }

  @action
  closeAddMoney() {
    this.addMoneyClicked = false;
  }
}
