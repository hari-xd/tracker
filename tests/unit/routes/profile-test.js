import { module, test } from 'qunit';
import { setupTest } from 'tracker/tests/helpers';

module('Unit | Route | profile', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:profile');
    assert.ok(route);
  });
});
