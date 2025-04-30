import Route from '@ember/routing/route';
import { service } from '@ember/service';


export default class TransactionsRoute extends Route {
    @service digiwallet;

    model(){
        // this.digiwallet.getransactions();
        // let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        // console.log('route',this.digiwallet.getransactions());
        // // return transactions.reverse();
        return this.digiwallet.getransactions();
    }
}
