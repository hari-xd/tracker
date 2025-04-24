import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class SubscriptionsController extends Controller {
  @service digiwallet;

  @tracked editSubscription = false;
  @tracked data = {};
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
    this.loadInitialTable();
  }
  loadInitialTable(){
    this.data = JSON.parse(localStorage.getItem('data'));
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

  @action
  submitForm() {
    this.data = JSON.parse(localStorage.getItem('data'));
    // console.log('hi');
    // let data = JSON.parse(localStorage.getItem("data"))
    // this.newArray = [this.subscriptionName,this.subscriptionPrice, this.subscriptionPlan,this.billingCycle, this.paymentMethod,
    //     this.subscriptionStartDate,this.subscriptionEndDate];

    this.newObj = {
      id:this.data.length+1,
      subscriptionName: this.subscriptionName,
      subscriptionPrice: parseInt(this.subscriptionPrice),
      subscriptionPlan: this.subscriptionPlan,
      billingCycle: this.billingCycle,
      subscriptionType: this.subscriptionName.toLowerCase(),
      paymentMethod: this.paymentMethod,
      subscriptionStartDate: this.subscriptionStartDate,
      subscriptionEndDate: this.subscriptionEndDate,
      subscriptionStatus: 'active',
    };

    // this.data = { ...this.data, [Object.keys(this.data).length]: this.newObj };

    // localStorage.setItem('data', JSON.stringify(this.data));
    console.log(this.data);

    return this.data;
  }

  @action
  editButtonClicked(id){
    this.subscriptionId = id;
    this.editSubscription = !this.editSubscription
    console.log(this.data[id-1]);
  }

  @action
  deleteButtonClicked(id){
    delete this.data[id-1];
    // this.data[id-1].remove();
    
    localStorage.setItem('data', JSON.stringify(this.data));
    console.log(JSON.parse(localStorage.getItem("data")));
    this.loadInitialTable();
  }

  @action
  updateSubscription(id){
    console.log(id);
    
    this.data[id-1] = {
      "id":id,
      "subscriptionName": this.subscriptionName,
      "subscriptionPrice": parseInt(this.subscriptionPrice),
      "subscriptionPlan": this.subscriptionPlan,
      "billingCycle": this.billingCycle,
      "subscriptionType": this.subscriptionName.toLowerCase(),
      "paymentMethod": this.paymentMethod,
      "subscriptionStartDate": this.subscriptionStartDate,
      "subscriptionEndDate": this.subscriptionEndDate,
      "subscriptionStatus": 'active',
    }
    localStorage.setItem('data', JSON.stringify(this.data));
    console.log(this.data);
    this.editSubscription = false;
    this.loadInitialTable();
  }
  @action
  cancelEdit(){
    this.editSubscription = false
  }
}
