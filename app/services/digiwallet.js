import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DigiwalletService extends Service {
  get walletAmount(){
    const digiWallet = localStorage.getItem('amount');
    return digiWallet;
  }

  get subscriptionData(){
    const subscriptionJsonData = JSON.parse(localStorage.getItem("data"));

    return subscriptionJsonData;
  }

  appendNewSubscribtion(arr){
    console.log('hi');
    const data = [...JSON.parse(localStorage.getItem("data")),arr ]
    console.log(data);
  }
}
