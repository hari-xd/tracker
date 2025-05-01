import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class WalletController extends Controller {
  @service digiwallet;

  @tracked addMoneyClicked = false;
  @tracked amount = localStorage.getItem("amount");
  // @tracked amount = 100;

  @tracked paymentType = '';
  @tracked upamount = 0;

  @tracked transactions = [];
  getdate(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    this.formattedDate = `${day}-${month}-${year}`;
    console.log(this.formattedDate);
    return this.formattedDate;
}

  addMoneyTransaction(){
    
    this.transactions = JSON.parse(localStorage.getItem('transactions'));
    this.transactions[this.transactions.length] = {
      subscriptionName:"Amount Credited",
      subscriptionType:"profile",
      paymentMethod:"Debit",
      subscriptionStatus:'expired',
      balance: this.amount,
      type:"credit",
      subscriptionPrice:parseInt(this.upamount),
      transactiondate: this.getdate(),
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
    this.digiwallet.getamount();
  }
  loadInitialAmount() {
    this.amount = localStorage.getItem('amount');
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
    this.amount = localStorage.getItem("amount")
    console.log(parseInt(this.amount));
    console.log(parseInt(this.upamount));
    this.amount = parseInt(this.amount) + parseInt(this.upamount);
    this.digiwallet.updateAmount(this.amount);
    localStorage.setItem('amount', this.amount);
    this.digiwallet.getamount();
    this.digiwallet.getTotalAmountCredited(parseInt(this.upamount));
    this.addMoneyTransaction();
    this.addMoneyClicked = false;
    return this.amount;
  }

  @action
  closeAddMoney() {
    this.addMoneyClicked = false;
  }
}
