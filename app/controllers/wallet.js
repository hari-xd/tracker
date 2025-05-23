import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class WalletController extends Controller {
  @service digiwallet;
  @service flashMessages;

  @tracked addMoneyClicked = false;
  @tracked amount = localStorage.getItem('amount') || 0;

  @tracked paymentType = '';
  @tracked upamount = 0;

  @tracked transactions = [];
  getdate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    this.formattedDate = `${day}-${month}-${year}`;
    console.log(this.formattedDate);
    return this.formattedDate;
  }

  addMoneyTransaction() {
    this.transactions = JSON.parse(localStorage.getItem('transactions'));
    this.transactions[this.transactions.length] = {
      subscriptionName: 'Amount Credited',
      subscriptionType: 'profile',
      paymentMethod: 'Debit',
      subscriptionStatus: 'expired',
      balance: this.amount,
      type: 'credit',
      subscriptionPrice: parseInt(this.upamount),
      transactiondate: this.getdate(),
    };
    console.log(this.transactions);
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
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
    this.amount = localStorage.getItem('amount');
    console.log('1', parseInt(this.amount));
    console.log('2', parseInt(this.upamount));
    if (parseInt(this.upamount) < 0) {
      this.flashMessages.warning('Negative Amount can no be added');
      this.addMoneyClicked = false;
      return this.amount;
    }
    this.amount = parseInt(this.amount) + parseInt(this.upamount);
    console.log('3 amount', parseInt(this.amount));
    // this.digiwallet.updateAmount(this.amount);
    localStorage.setItem('amount', this.amount);
    console.log('4 local', localStorage.getItem('amount'));
    this.digiwallet.getamount();
    this.digiwallet.getTotalAmountCredited(parseInt(this.upamount));
    this.addMoneyTransaction();
    this.addMoneyClicked = false;
    this.flashMessages.success(
      `$${this.upamount} Money debited into the wallet`,
    );
    this.digiwallet.getransactions();
    return this.amount;
  }

  @action
  closeAddMoney() {
    this.addMoneyClicked = false;
  }
}
