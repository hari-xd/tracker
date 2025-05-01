import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class TransactionsController extends Controller {
  @service digiwallet;
  @tracked transactions = [];
  // @tracked transactions = { };
  // @tracked formattedDate = '';

  // constructor(...args) {
  //     super(...args);
  //     this.loadInitialTransactions();
  //     this.getdate();
  // }

  // getdate(){
  //     const currentDate = new Date();
  //     const year = currentDate.getFullYear();
  //     const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  //     const day = String(currentDate.getDate()).padStart(2, '0');
  //     this.formattedDate = `${day}-${month}-${year}`;
  //     console.log(this.formattedDate);
  //     return this.formattedDate;
  // }
  @action
  updateTransactionType() {
    this.digiwallet.gettransactiontype(event.target.value);
    this.digiwallet.getransactions();
    this.transactions = this.digiwallet.getransactions();
  }
}
