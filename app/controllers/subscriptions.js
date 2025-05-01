import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class SubscriptionsController extends Controller {
  @service digiwallet;

  @tracked editSubscription = false;
  @tracked data = this.digiwallet.loadInitialTable() || {};
  @tracked transactionHistory = [];
  @tracked newArray = [];
  @tracked newObj = {};
  @tracked subscriptionId = 0;
  @tracked addSubscription = false;
  @tracked subscriptionName = '';
  @tracked subscriptionPrice = 0;
  @tracked subscriptionPlan = '';
  @tracked billingCycle = '';
  @tracked paymentMethod = '';
  @tracked subscriptionStartDate = '';
  @tracked subscriptionEndDate = '';

  constructor(...args) {
    super(...args);
  }

  @action
  addSubscriptionForm() {
    this.addSubscription = !this.addSubscription;
  }
  @action
  updateSubscriptionName() {
    this.subscriptionName = event.target.value;
    console.log(this.subscriptionName);
    return this.subscriptionName;
  }

  @action
  updateSubscriptionPrice() {
    this.subscriptionPrice = event.target.value;
    console.log(this.subscriptionPrice);
    return this.subscriptionPrice;
  }

  @action
  updateSubscriptionPlan() {
    this.subscriptionPlan = event.target.value;
    console.log(this.subscriptionPlan);

    return this.subscriptionPlan;
  }

  @action
  updateBillingCycle() {
    this.billingCycle = event.target.value;
    console.log(this.billingCycle);
    return this.billingCycle;
  }

  @action
  updatePaymentMethod() {
    this.paymentMethod = event.target.value;
    console.log(this.paymentMethod);
    return this.paymentMethod;
  }
  @action
  updateSubscriptionStartDate() {
    this.subscriptionStartDate = event.target.value;
    console.log(this.subscriptionStartDate);
    return this.subscriptionStartDate;
  }

  @action
  updateSubscriptionEndDate() {
    this.subscriptionEndDate = event.target.value;
    console.log(this.subscriptionEndDate);
    return this.subscriptionEndDate;
  }
  getdate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    this.formattedDate = `${day}-${month}-${year}`;
    console.log(this.formattedDate);
    return this.formattedDate;
  }
  @action
  submitForm() {
    if (
      this.paymentMethod == 'wallet' &&
      parseInt(localStorage.getItem('amount')) <
        parseInt(this.subscriptionPrice)
    ) {
      this.addSubscription = false;
    } else {
      this.data = JSON.parse(localStorage.getItem('data'));
      let reduceAmount = localStorage.getItem('amount');
      let Availbalance = localStorage.getItem('amount');
      // console.log('hi');
      // let data = JSON.parse(localStorage.getItem("data"))
      // this.newArray = [this.subscriptionName,this.subscriptionPrice, this.subscriptionPlan,this.billingCycle, this.paymentMethod,
      //     this.subscriptionStartDate,this.subscriptionEndDate];
      if (this.paymentMethod == 'wallet') {
        Availbalance =
          localStorage.getItem('amount') - parseInt(this.subscriptionPrice);
      }
      this.newObj = {
        id: this.data.length + 1,
        subscriptionName: this.subscriptionName.toLowerCase(),
        subscriptionPrice: parseInt(this.subscriptionPrice),
        subscriptionPlan: this.subscriptionPlan,
        billingCycle: this.billingCycle,
        subscriptionType: this.subscriptionName.toLowerCase(),
        paymentMethod: this.paymentMethod,
        subscriptionStartDate: this.subscriptionStartDate,
        subscriptionEndDate: this.subscriptionEndDate,
        subscriptionStatus: 'active',
        type: 'debit',
        balance: parseInt(Availbalance),
        transactiondate: this.getdate(),
      };

      // this.transactionHistory[this.transactionHistory.length] = this.newObj;
      // this.transactionHistory = [...this.transactionHistory,this.newObj];

      // localStorage.setItem (
      //   'transactions',
      //   JSON.stringify(this.transactionHistory),
      // );

      this.transactionHistory =
        JSON.parse(localStorage.getItem('transactions')) || [];
      this.transactionHistory.push(this.newObj);
      localStorage.setItem(
        'transactions',
        JSON.stringify(this.transactionHistory),
      );

      if (this.paymentMethod == 'wallet') {
        reduceAmount =
          parseInt(reduceAmount) - parseInt(this.subscriptionPrice);
      }
      localStorage.setItem('amount', reduceAmount);
      // this.data = { ...this.data, [Object.keys(this.data).length]: this.newObj };

      // localStorage.setItem('data', JSON.stringify(this.data));

      this.data[this.data.length] = this.newObj;
      localStorage.setItem('data', JSON.stringify(this.data));

      this.data = this.digiwallet.loadInitialTable();
      this.addSubscription = false;
      this.digiwallet.autoDeductMoney(this.data.length);
      return this.data;
    }
    this.flashMessages.success('Success!');
  }

  @action
  editButtonClicked(id) {
    this.subscriptionId = id;
    this.editSubscription = !this.editSubscription;
  }

  @action
  deleteButtonClicked(id) {
    let refundAmount = localStorage.getItem('amount');
    // refundAmount = parseInt(refundAmount)+parseInt(this.data[id - 1].subscriptionPrice);
    // localStorage.setItem('amount', refundAmount);
    // this.data[id - 1].subscriptionStatus = "cancelled"
    // // delete this.data[id - 1];
    // localStorage.setItem('data', JSON.stringify(this.data));
    //this.data = this.digiwallet.loadInitialTable();

    if (this.data[id - 1].paymentMethod == 'wallet') {
      if (this.data[id - 1].subscriptionStatus.toLowerCase() == 'active') {
        refundAmount =
          parseInt(refundAmount) +
          parseInt(this.data[id - 1].subscriptionPrice);
        localStorage.setItem('amount', refundAmount);
        this.data[id - 1].subscriptionStatus = 'cancelled';
        this.data[id - 1].type = 'refund';
        this.data[id - 1].balance = localStorage.getItem('amount');

        // delete this.data[id - 1];
        // this.transactionHistory[this.transactionHistory.length] = this.data[id - 1];
        // localStorage.setItem(
        //   'transactions',
        //   JSON.stringify(this.transactionHistory),
        // );

        this.transactionHistory =
          JSON.parse(localStorage.getItem('transactions')) || [];
        this.transactionHistory.push(this.data[id - 1]);
        localStorage.setItem(
          'transactions',
          JSON.stringify(this.transactionHistory),
        );

        localStorage.setItem('data', JSON.stringify(this.data));
        this.data = this.digiwallet.loadInitialTable();
      } else {
        if(parseInt(refundAmount)>=parseInt(this.data[id - 1].subscriptionPrice)){

        
        refundAmount =
          parseInt(refundAmount) -
          parseInt(this.data[id - 1].subscriptionPrice);
        localStorage.setItem('amount', refundAmount);
        this.data[id - 1].subscriptionStatus = 'active';
        this.data[id - 1].type = 'debit';
        this.data[id - 1].balance = localStorage.getItem('amount');

        // this.transactionHistory[this.transactionHistory.length] = this.data[id - 1];
        // localStorage.setItem(
        //   'transactions',
        //   JSON.stringify(this.transactionHistory),
        // );
        this.transactionHistory =
          JSON.parse(localStorage.getItem('transactions')) || [];
        this.transactionHistory.push(this.data[id - 1]);
        localStorage.setItem(
          'transactions',
          JSON.stringify(this.transactionHistory),
        );

        localStorage.setItem('data', JSON.stringify(this.data));
        this.digiwallet.autoDeductMoney(this.data.length);
        this.data = this.digiwallet.loadInitialTable();
      }
    }
    } else {
      if (this.data[id - 1].subscriptionStatus.toLowerCase() == 'active') {
        this.data[id - 1].subscriptionStatus = 'cancelled';
        this.data[id - 1].type = 'refund';
        this.data[id - 1].balance = localStorage.getItem('amount');
        // delete this.data[id - 1];

        this.transactionHistory =
          JSON.parse(localStorage.getItem('transactions')) || [];
        this.transactionHistory.push(this.data[id - 1]);
        localStorage.setItem(
          'transactions',
          JSON.stringify(this.transactionHistory),
        );

        localStorage.setItem('data', JSON.stringify(this.data));
        this.data = this.digiwallet.loadInitialTable();
      } else {
        this.data[id - 1].subscriptionStatus = 'active';
        this.data[id - 1].type = 'debit';
        this.data[id - 1].balance = localStorage.getItem('amount');

        this.transactionHistory =
          JSON.parse(localStorage.getItem('transactions')) || [];
        this.transactionHistory.push(this.data[id - 1]);
        localStorage.setItem(
          'transactions',
          JSON.stringify(this.transactionHistory),
        );

        localStorage.setItem('data', JSON.stringify(this.data));
        this.data = this.digiwallet.loadInitialTable();
      }
    }
  }

  @action
  permanentDeleteButtonClicked(id) {
    delete this.data[id - 1];
    localStorage.setItem('data', JSON.stringify(this.data));
    this.data = this.digiwallet.loadInitialTable();
  }

  @action
  updateSubscription(id) {
    console.log(id);

    this.data[id - 1] = {
      id: id,
      subscriptionName: this.subscriptionName.toLowerCase(),
      subscriptionPrice: parseInt(this.subscriptionPrice),
      subscriptionPlan: this.subscriptionPlan,
      billingCycle: this.billingCycle,
      subscriptionType: this.subscriptionName.toLowerCase(),
      paymentMethod: this.paymentMethod,
      subscriptionStartDate: this.subscriptionStartDate,
      subscriptionEndDate: this.subscriptionEndDate,
      subscriptionStatus: 'active',
    };
    localStorage.setItem('data', JSON.stringify(this.data));
    console.log(this.data);
    this.editSubscription = false;
    this.data = this.digiwallet.loadInitialTable();
  }
  @action
  cancelEdit() {
    this.editSubscription = false;
  }

  @action
  closeEditSubscription() {
    this.editSubscription = false;
  }

  @action
  closeAddSubscription() {
    this.addSubscription = false;
  }
}
