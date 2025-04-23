import EmberRouter from '@ember/routing/router';
import config from 'tracker/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('subscriptions');
  this.route('transactions');
  this.route('wallet');
  this.route('profile');
});
