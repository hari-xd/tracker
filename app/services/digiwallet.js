import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class DigiwalletService extends Service {
  @service flashMessages;

  @tracked searchInput = '';
  @tracked walletAmount = localStorage.getItem('amount') || 100;
  @tracked subscriptionCards = [];
  @tracked transactionHistory = [];
  @tracked totalAmount = localStorage.getItem('totalAmount') || 100;
  @tracked filtertype = '';
  @tracked data = [];
  @tracked transact =
    JSON.parse(localStorage.getItem('transactions')).reverse() || [];

  constructor(...args) {
    super(...args);
    this.getransactions();
    this.getamount();
    this.loadInitialTable();
    this.refreshAutoPay();
  }

  loadInitialTable() {
    this.data = JSON.parse(localStorage.getItem('data')) || [];
    return this.data;
  }
  getamount() {
    this.walletAmount = localStorage.getItem('amount');
    return this.walletAmount;
  }

  get applicationWalletAmount() {
    this.walletAmount = localStorage.getItem('amount');
    return this.walletAmount;
  }

  updateAmount(amt) {
    localStorage.setItem('amount', amt);
  }
  gettransactiontype(value) {
    this.filtertype = value;
    return value;
  }

  getransactions() {
    this.applicationWalletAmount;
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = transactions.reverse();
    if (this.filtertype) {
      this.transact = [];
      let flag = 0;
      transactions.reverse().forEach((element) => {
        if (element) {
          if (element.type == this.filtertype) {
            this.transact.push(element);
            flag = 1;
          }
          if (this.filtertype == 'all') {
            flag = 2;
          }
        }
      });
      if (flag == 1) {
        return this.transact;
      }
      if (flag == 2) {
        this.transact = transactions;
        return this.transact;
      } else {
        return;
      }
    } else {
      this.transact = transactions;
      console.log('else', this.transact);
      return this.transact;
    }
  }

  getTotalAmountCredited(value) {
    this.totalAmount = localStorage.getItem('totalAmount');
    this.totalAmount = parseInt(this.totalAmount) + parseInt(value);
    localStorage.setItem('totalAmount', this.totalAmount);
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

  autoDeductMoney(id) {
    this.applicationWalletAmount;
    console.log('hi');
    let data = JSON.parse(localStorage.getItem('data'));
    let amount = parseInt(localStorage.getItem('amount'));

    console.log(id);
    console.log(data[id]);

    if (amount > 0 && data[id - 1].paymentMethod == 'wallet') {
      // const autoDeductFunction = () => {
      //   let freshAmount = parseInt(localStorage.getItem('amount'));
      //   if (
      //     freshAmount > 0 &&
      //     freshAmount >= parseInt(data[id - 1].subscriptionPrice)
      //   ) {
      //     console.log('started loop');
      //     freshAmount = freshAmount - parseInt(data[id - 1].subscriptionPrice);
      //     localStorage.setItem('amount', freshAmount);
      //     this.newObj = {
      //       id: id - 1,
      //       subscriptionName: data[id - 1].subscriptionName.toLowerCase(),
      //       subscriptionPrice: parseInt(data[id - 1].subscriptionPrice),
      //       subscriptionPlan: data[id - 1].subscriptionPlan,
      //       billingCycle: data[id - 1].billingCycle,
      //       subscriptionType: data[id - 1].subscriptionName.toLowerCase(),
      //       paymentMethod: data[id - 1].paymentMethod,
      //       subscriptionStartDate: data[id - 1].subscriptionStartDate,
      //       subscriptionEndDate: data[id - 1].subscriptionEndDate,
      //       subscriptionStatus: 'active',
      //       type: 'debit',
      //       balance: freshAmount,
      //       transactiondate: this.getdate(),
      //     };
      //     this.transactionHistory =
      //       JSON.parse(localStorage.getItem('transactions')) || [];
      //     this.transactionHistory.push(this.newObj);
      //     localStorage.setItem(
      //       'transactions',
      //       JSON.stringify(this.transactionHistory),
      //     );
      //     this.getransactions();
      //     console.log('ended loop', id);
      //   } else {
      //     // data = JSON.parse(localStorage.getItem('data'));
      //     console.log('cancelled', data[id - 1].subscriptionName);
      //     data[id - 1].subscriptionStatus = 'cancelled';
      //     localStorage.setItem('data', JSON.stringify(data));
      //     this.loadInitialTable();
      //     return;
      //   }
      // };

      if (
        amount >= parseInt(data[id - 1].subscriptionPrice) &&
        data[id - 1].paymentMethod === 'wallet'
      ) {
        console.log('subscriptionPrice');

        if (data[id - 1].billingCycle === 'monthly') {
          console.log('monthly');
          let interval = setInterval(() => {
            let freshAmount = parseInt(localStorage.getItem('amount'));
            if (
              freshAmount > 0 &&
              freshAmount >= parseInt(data[id - 1].subscriptionPrice)
            ) {
              data = JSON.parse(localStorage.getItem('data'));
              if (data[id - 1].subscriptionStatus == 'cancelled') {
                clearInterval(interval);
                console.log('interval cleared in mid');
                return;
              }
              console.log('started loop');
              freshAmount =
                freshAmount - parseInt(data[id - 1].subscriptionPrice);
              localStorage.setItem('amount', freshAmount);
              this.newObj = {
                id: id - 1,
                subscriptionName: data[id - 1].subscriptionName.toLowerCase(),
                subscriptionPrice: parseInt(data[id - 1].subscriptionPrice),
                subscriptionPlan: data[id - 1].subscriptionPlan,
                billingCycle: data[id - 1].billingCycle,
                subscriptionType: data[id - 1].subscriptionName.toLowerCase(),
                paymentMethod: data[id - 1].paymentMethod,
                subscriptionStartDate: data[id - 1].subscriptionStartDate,
                subscriptionEndDate: data[id - 1].subscriptionEndDate,
                subscriptionStatus: 'active',
                type: 'debit',
                balance: freshAmount,
                transactiondate: this.getdate(),
              };
              this.transactionHistory =
                JSON.parse(localStorage.getItem('transactions')) || [];
              this.transactionHistory.push(this.newObj);
              localStorage.setItem(
                'transactions',
                JSON.stringify(this.transactionHistory),
              );
              this.getransactions();
              console.log('status', data[id - 1].subscriptionStatus);

              console.log('ended loop', id);
            } else {
              data = JSON.parse(localStorage.getItem('data'));
              console.log('cancelled', data[id - 1].subscriptionName);
              data[id - 1].subscriptionStatus = 'cancelled';
              localStorage.setItem('data', JSON.stringify(data));
              this.flashMessages.info('Subscription Cancelled');

              this.loadInitialTable();
              clearInterval(interval);
              return;
            }
          }, 10000);
        }

        if (data[id - 1].billingCycle === '3 months') {
          console.log('3 months start');
          let interval = setInterval(() => {
            let freshAmount = parseInt(localStorage.getItem('amount'));
            if (
              freshAmount > 0 &&
              freshAmount >= parseInt(data[id - 1].subscriptionPrice)
            ) {
              data = JSON.parse(localStorage.getItem('data'));
              if (data[id - 1].subscriptionStatus == 'cancelled') {
                clearInterval(interval);
                console.log('interval cleared in mid');
                return;
              }
              console.log('started loop');
              freshAmount =
                freshAmount - parseInt(data[id - 1].subscriptionPrice);
              localStorage.setItem('amount', freshAmount);
              this.newObj = {
                id: id - 1,
                subscriptionName: data[id - 1].subscriptionName.toLowerCase(),
                subscriptionPrice: parseInt(data[id - 1].subscriptionPrice),
                subscriptionPlan: data[id - 1].subscriptionPlan,
                billingCycle: data[id - 1].billingCycle,
                subscriptionType: data[id - 1].subscriptionName.toLowerCase(),
                paymentMethod: data[id - 1].paymentMethod,
                subscriptionStartDate: data[id - 1].subscriptionStartDate,
                subscriptionEndDate: data[id - 1].subscriptionEndDate,
                subscriptionStatus: 'active',
                type: 'debit',
                balance: freshAmount,
                transactiondate: this.getdate(),
              };
              this.transactionHistory =
                JSON.parse(localStorage.getItem('transactions')) || [];
              this.transactionHistory.push(this.newObj);
              localStorage.setItem(
                'transactions',
                JSON.stringify(this.transactionHistory),
              );
              this.getransactions();
              console.log('ended loop', id);
              console.log('3 months end');
            } else {
              data = JSON.parse(localStorage.getItem('data'));
              console.log('cancelled', data[id - 1].subscriptionName);
              data[id - 1].subscriptionStatus = 'cancelled';
              localStorage.setItem('data', JSON.stringify(data));
              this.flashMessages.info('Subscription Cancelled');

              this.loadInitialTable();
              clearInterval(interval);
              return;
            }
          }, 20000);
        }

        if (data[id - 1].billingCycle === 'yearly') {
          let interval = setInterval(() => {
            let freshAmount = parseInt(localStorage.getItem('amount'));
            if (
              freshAmount > 0 &&
              freshAmount >= parseInt(data[id - 1].subscriptionPrice)
            ) {
              data = JSON.parse(localStorage.getItem('data'));
              if (data[id - 1].subscriptionStatus == 'cancelled') {
                clearInterval(interval);
                console.log('interval cleared in mid');
                return;
              }
              console.log('started loop');
              freshAmount =
                freshAmount - parseInt(data[id - 1].subscriptionPrice);
              localStorage.setItem('amount', freshAmount);
              this.newObj = {
                id: id - 1,
                subscriptionName: data[id - 1].subscriptionName.toLowerCase(),
                subscriptionPrice: parseInt(data[id - 1].subscriptionPrice),
                subscriptionPlan: data[id - 1].subscriptionPlan,
                billingCycle: data[id - 1].billingCycle,
                subscriptionType: data[id - 1].subscriptionName.toLowerCase(),
                paymentMethod: data[id - 1].paymentMethod,
                subscriptionStartDate: data[id - 1].subscriptionStartDate,
                subscriptionEndDate: data[id - 1].subscriptionEndDate,
                subscriptionStatus: 'active',
                type: 'debit',
                balance: freshAmount,
                transactiondate: this.getdate(),
              };
              this.transactionHistory =
                JSON.parse(localStorage.getItem('transactions')) || [];
              this.transactionHistory.push(this.newObj);
              localStorage.setItem(
                'transactions',
                JSON.stringify(this.transactionHistory),
              );
              this.getransactions();
              console.log('ended loop', id);
            } else {
              data = JSON.parse(localStorage.getItem('data'));
              console.log('cancelled', data[id - 1].subscriptionName);
              data[id - 1].subscriptionStatus = 'cancelled';
              localStorage.setItem('data', JSON.stringify(data));
              this.flashMessages.info('Subscription Cancelled');

              this.loadInitialTable();
              clearInterval(interval);
              return;
            }
          }, 30000);
        }
      } else {
        if (data[id - 1].billingCycle == 'monthly') {
          setTimeout(() => {
            console.log(data[id - 1]);
            data[id - 1].subscriptionStatus = 'cancelled';
            localStorage.setItem('data', JSON.stringify(data));
            this.loadInitialTable();
            this.flashMessages.info('Subscription Cancelled');
          }, 10000);
        }
        if (data[id - 1].billingCycle == '3 months') {
          setTimeout(() => {
            data[id - 1].subscriptionStatus = 'cancelled';
            localStorage.setItem('data', JSON.stringify(data));
            this.loadInitialTable();
            this.flashMessages.info('Subscription Cancelled');
          }, 20000);
        }
        if (data[id - 1].billingCycle == 'yearly') {
          setTimeout(() => {
            data[id - 1].subscriptionStatus = 'cancelled';
            localStorage.setItem('data', JSON.stringify(data));
            this.loadInitialTable();
            this.flashMessages.info('Subscription Cancelled');
          }, 30000);
        }
      }
    } else {
      if (data[id - 1].billingCycle == 'monthly') {
        setTimeout(() => {
          data[id - 1].subscriptionStatus = 'cancelled';
          localStorage.setItem('data', JSON.stringify(data));
          this.loadInitialTable();
          this.flashMessages.info('Subscription Cancelled');
        }, 10000);
      }
      if (data[id - 1].billingCycle == '3 months') {
        setTimeout(() => {
          data[id - 1].subscriptionStatus = 'cancelled';
          localStorage.setItem('data', JSON.stringify(data));
          this.loadInitialTable();
          this.flashMessages.info('Subscription Cancelled');
        }, 20000);
      }
      if (data[id - 1].billingCycle == 'yearly') {
        setTimeout(() => {
          data[id - 1].subscriptionStatus = 'cancelled';
          localStorage.setItem('data', JSON.stringify(data));
          this.loadInitialTable();
          this.flashMessages.info('Subscription Cancelled');
        }, 30000);
      }
    }
  }

  get displayCards() {
    let flag = 0;
    this.filteredSubscription.forEach((element) => {
      if (element) {
        flag = 1;
      }
    });
    if (flag == 1) {
      return true;
    }
    return false;
  }

  searchValue(value) {
    this.searchInput = value;
    console.log('service', this.searchInput);
  }

  get filteredSubscription() {
    if (!this.searchInput) {
      return this.data;
    }
    return this.data.filter((obj) =>
      obj?.subscriptionName
        ?.toLowerCase()
        .includes(this.searchInput.toLowerCase()),
    );
  }

  refreshAutoPay() {
    let data = JSON.parse(localStorage.getItem('data'));
    console.log('data', data);
    data.forEach((element) => {
      if (element) {
        if ((element.subscriptionStatus = 'active')) {
          console.log('id', element.id);
          this.autoDeductMoney(element.id);
          console.log('refresh active');
        }
      } else {
        console.log('no active subscriptions');
      }
    });
  }
}
