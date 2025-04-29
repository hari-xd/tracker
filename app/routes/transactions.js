import Route from '@ember/routing/route';

export default class TransactionsRoute extends Route {
    model(){
        let transactions = JSON.parse(localStorage.getItem('transactions'));
        return transactions;
    }
    }
