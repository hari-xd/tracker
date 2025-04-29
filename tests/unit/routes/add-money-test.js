import { module, test } from 'qunit';
import { setupTest } from 'tracker/tests/helpers';

module('Unit | Route | add-money', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:add-money');
    assert.ok(route);
  });
});
