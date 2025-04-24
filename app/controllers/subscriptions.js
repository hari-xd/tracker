import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';


export default class SubscriptionsController extends Controller {

@service digiwallet;
@tracked newArray = [];
@tracked addSubscription = true;
@tracked subscriptionName = '';
@tracked subscriptionPrice = 0;
@tracked subscriptionPlan = '';
@tracked billingCycle = '';
@tracked paymentMethod = '';
@tracked subscriptionStartDate = '';
@tracked subscriptionEndDate = '';

@action 
addSubscriptionForm(){
    this.addSubscription = !this.addSubscription;
}
@action
updateSubscriptionName(){
    this.subscriptionName = event.target.value;
    console.log(this.subscriptionName);
    return (this.subscriptionName);
}

@action
updateSubscriptionPrice(){
 this.subscriptionPrice = event.target.value;
 console.log(this.subscriptionPrice);
 return (this.subscriptionPrice);
}

@action
updateSubscriptionPlan(){
this.subscriptionPlan = event.target.value;
console.log(this.subscriptionPlan);

return (this.subscriptionPlan);
}

@action
updateBillingCycle(){
    this.billingCycle = event.target.value;
    console.log(this.billingCycle);
    return (this.billingCycle);
}

@action
updatePaymentMethod(){
    this.paymentMethod = event.target.value;
    console.log(this.paymentMethod);
    return this.paymentMethod;
}
@action
updateSubscriptionStartDate(){
    this.subscriptionStartDate = event.target.value;
    console.log(this.subscriptionStartDate);
    return this.subscriptionStartDate;
}

@action
updateSubscriptionEndDate(){
    this.subscriptionEndDate = event.target.value;
    console.log(this.subscriptionEndDate);
    return this.subscriptionEndDate;
}

@action
submitForm(){
    console.log('hi');
    this.newArray = [this.subscriptionName,this.subscriptionPrice, this.subscriptionPlan,this.billingCycle, this.paymentMethod, 
        this.subscriptionStartDate,this.subscriptionEndDate];
    console.log(this.newArray);
    return this.newArray;
}
}

