import { module, test } from 'qunit';
import { setupTest } from 'tracker/tests/helpers';

module('Unit | Controller | transactions', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:transactions');
    assert.ok(controller);
  });
});
