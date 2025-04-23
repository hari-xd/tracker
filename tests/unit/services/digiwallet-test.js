import { module, test } from 'qunit';
import { setupTest } from 'tracker/tests/helpers';

module('Unit | Service | digiwallet', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:digiwallet');
    assert.ok(service);
  });
});
