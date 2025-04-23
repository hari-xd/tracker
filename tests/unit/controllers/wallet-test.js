import { module, test } from 'qunit';
import { setupTest } from 'tracker/tests/helpers';

module('Unit | Controller | wallet', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:wallet');
    assert.ok(controller);
  });
});
