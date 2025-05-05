import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class DigiwalletService extends Service {
  @service flashMessages;

  @tracked searchInput = '';
  @tracked subCount = 0;
  @tracked sums = 0;
  @tracked subCounts = 0;
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

  get subscriptionsCount() {
    console.log('called 1');
    let data = JSON.parse(localStorage.getItem('data')) || [];
    console.log(data);
    let count = 0;

    if (data) {
      data.forEach((dat) => {
        if (dat) {
          if (dat.subscriptionStatus == 'active') {
            count = count + 1;
          }
        }
      });
    }
    this.subCounts = count;
    return this.subCounts;
  }

  get subscriptionsCharge() {
    console.log('called 2');
    let data = JSON.parse(localStorage.getItem('transactions'));
    let sum = 0;
    let sub = 0;
    if (data) {
      data.forEach((dat) => {
        if (dat) {
          if (dat.paymentMethod == 'wallet') {
            if (dat.subscriptionStatus == 'active') {
              sum = sum + parseInt(dat.subscriptionPrice);
            }
            if (dat.type == 'refund') {
              sub = sub + parseInt(dat.subscriptionPrice);
            }
          }
        }
      });
      console.log('sum', sum);
      console.log('subs', sub);
      sum = sum - sub;
      this.sums = sum;
      return this.sums;
    }
    return this.sums;
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
        return this.transact.reverse();
      }
      if (flag == 2) {
        this.transact = transactions;
        return this.transact.reverse();
      } else {
        return;
      }
    } else {
      this.transact = transactions;
      return transactions;
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
    return this.formattedDate;
  }

  autoDeductMoney(id) {
    this.applicationWalletAmount;
    let data = JSON.parse(localStorage.getItem('data'));
    let amount = parseInt(localStorage.getItem('amount'));

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
        if (data[id - 1].billingCycle === 'monthly') {
          let interval = setInterval(() => {
            let freshAmount = parseInt(localStorage.getItem('amount'));
            if (
              freshAmount > 0 &&
              freshAmount >= parseInt(data[id - 1].subscriptionPrice)
            ) {
              data = JSON.parse(localStorage.getItem('data'));
              if (data[id - 1].subscriptionStatus == 'cancelled') {
                clearInterval(interval);
                return;
              }
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
              console.log('deduct calling');
              this.subscriptionsCount;
              this.subscriptionsCharge;
            } else {
              data = JSON.parse(localStorage.getItem('data'));

              data[id - 1].subscriptionStatus = 'cancelled';
              localStorage.setItem('data', JSON.stringify(data));
              this.flashMessages.info('Subscription Cancelled');
              console.log('deduct calling');
              this.subscriptionsCount;
              this.subscriptionsCharge;
              this.loadInitialTable();
              clearInterval(interval);
              return;
            }
          }, 10000);
        }

        if (data[id - 1].billingCycle === '3 months') {
          let interval = setInterval(() => {
            let freshAmount = parseInt(localStorage.getItem('amount'));
            if (
              freshAmount > 0 &&
              freshAmount >= parseInt(data[id - 1].subscriptionPrice)
            ) {
              data = JSON.parse(localStorage.getItem('data'));
              if (data[id - 1].subscriptionStatus == 'cancelled') {
                clearInterval(interval);

                return;
              }

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
            } else {
              data = JSON.parse(localStorage.getItem('data'));
              data[id - 1].subscriptionStatus = 'cancelled';
              localStorage.setItem('data', JSON.stringify(data));
              this.flashMessages.info('Subscription Cancelled');
              console.log('deduct calling');
              this.subscriptionsCount;
              this.subscriptionsCharge;
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
                return;
              }
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
            } else {
              data = JSON.parse(localStorage.getItem('data'));
              data[id - 1].subscriptionStatus = 'cancelled';
              localStorage.setItem('data', JSON.stringify(data));
              this.flashMessages.info('Subscription Cancelled');
              console.log('deduct calling');
              this.subscriptionsCount;
              this.subscriptionsCharge;
              this.loadInitialTable();
              clearInterval(interval);
              return;
            }
          }, 30000);
        }
      } else {
        if (
          data[id - 1].billingCycle == 'monthly' &&
          data[id - 1].subscriptionStatus == 'active'
        ) {
          setTimeout(() => {
            data[id - 1].subscriptionStatus = 'cancelled';
            localStorage.setItem('data', JSON.stringify(data));
            this.loadInitialTable();
            this.flashMessages.info('Subscription Cancelled');
            console.log('deduct calling');
            this.subscriptionsCount;
            this.subscriptionsCharge;
          }, 10000);
        }
        if (
          data[id - 1].billingCycle == '3 months' &&
          data[id - 1].subscriptionStatus == 'active'
        ) {
          setTimeout(() => {
            data[id - 1].subscriptionStatus = 'cancelled';
            localStorage.setItem('data', JSON.stringify(data));
            this.loadInitialTable();
            this.flashMessages.info('Subscription Cancelled');
            console.log('deduct calling');
            this.subscriptionsCount;
            this.subscriptionsCharge;
          }, 20000);
        }
        if (
          data[id - 1].billingCycle == 'yearly' &&
          data[id - 1].subscriptionStatus == 'active'
        ) {
          setTimeout(() => {
            data[id - 1].subscriptionStatus = 'cancelled';
            localStorage.setItem('data', JSON.stringify(data));
            this.loadInitialTable();
            this.flashMessages.info('Subscription Cancelled');
            console.log('deduct calling');
            this.subscriptionsCount;
            this.subscriptionsCharge;
          }, 30000);
        }
      }
    } else {
      if (
        data[id - 1].billingCycle == 'monthly' &&
        data[id - 1].subscriptionStatus == 'active'
      ) {
        setTimeout(() => {
          data[id - 1].subscriptionStatus = 'cancelled';
          localStorage.setItem('data', JSON.stringify(data));
          this.loadInitialTable();
          this.flashMessages.info('Subscription Cancelled');
          this.subscriptionsCount;
          this.subscriptionsCharge;
        }, 10000);
      }
      if (
        data[id - 1].billingCycle == '3 months' &&
        data[id - 1].subscriptionStatus == 'active'
      ) {
        setTimeout(() => {
          data[id - 1].subscriptionStatus = 'cancelled';
          localStorage.setItem('data', JSON.stringify(data));
          this.loadInitialTable();
          this.flashMessages.info('Subscription Cancelled');
          this.subscriptionsCount;
          this.subscriptionsCharge;
        }, 20000);
      }
      if (
        data[id - 1].billingCycle == 'yearly' &&
        data[id - 1].subscriptionStatus == 'active'
      ) {
        setTimeout(() => {
          data[id - 1].subscriptionStatus = 'cancelled';
          localStorage.setItem('data', JSON.stringify(data));
          this.loadInitialTable();
          this.flashMessages.info('Subscription Cancelled');
          this.subscriptionsCount;
          this.subscriptionsCharge;
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
    if (data) {
      data.forEach((element) => {
        if (element) {
          if ((element.subscriptionStatus = 'active')) {
            this.autoDeductMoney(element.id);
          }
        } else {
        }
      });
    }
  }
}
