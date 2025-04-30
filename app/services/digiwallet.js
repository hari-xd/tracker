import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DigiwalletService extends Service {
  @tracked walletAmount = 0;
  @tracked totalAmount = localStorage.getItem('totalAmount');
  @tracked filtertype = '';
  @tracked transact = JSON.parse(localStorage.getItem('transactions')).reverse() || [];

  constructor(...args) {
    super(...args);
    this.getransactions();
    this.getamount();
  }
  getamount(){
    this.walletAmount = localStorage.getItem('amount');
    console.log('controller',this.walletAmount);
  }

  
  updateAmount(amt) {
    localStorage.setItem('amount', amt);
  }
  gettransactiontype(value){
    this.filtertype = value;
    return value;
  }

  getransactions(){
    let transactions = JSON.parse(localStorage.getItem('transactions')).reverse() || [];
    if(this.filtertype){
      this.transact = [];
      let flag = 0;
      transactions.forEach(element => {
        if(element.type == this.filtertype){
          this.transact.push(element);
          flag = 1;
        }
        if(this.filtertype == 'all'){
          flag = 2;
        }
      });
      if(flag == 1){
        return this.transact;
      }
      if(flag == 2){
        this.transact = transactions;
        return this.transact;
      }
      else{
        return
      }
      
    }
    else{
      this.transact = transactions;
      console.log('else',this.transact);
      return this.transact;
    }
    
  }

  getTotalAmountCredited(value){
    this.totalAmount = localStorage.getItem('totalAmount');
    this.totalAmount = parseInt(this.totalAmount) + parseInt(value);
    localStorage.setItem('totalAmount',this.totalAmount);
  }
}
