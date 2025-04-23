import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DigiwalletService extends Service {
  @tracked wallet = 0;
}
