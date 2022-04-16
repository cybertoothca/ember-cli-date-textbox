import EmberObject from '@ember/object';
import DateTextboxEventsMixin from 'ember-cli-date-textbox/mixins/-date-textbox-events';
import { module, test } from 'qunit';

module('Unit | Mixin |  date textbox events', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let DateTextboxEventsObject = EmberObject.extend(DateTextboxEventsMixin);
    let subject = DateTextboxEventsObject.create();
    assert.ok(subject);
  });
});
