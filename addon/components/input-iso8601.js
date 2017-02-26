/* global moment */
import Ember from 'ember';

export default Ember.TextField.extend({
  actions: {
    parse(value) {
      const parsedDate = Date.parse(value);
      const iso8601 = Ember.isPresent(parsedDate) ? parsedDate.toISOString() : '';
      Ember.trySet(this, 'iso8601', iso8601);

      if (Ember.isPresent(parsedDate) || Ember.isBlank(value)) {
        this.$().closest('.form-group').removeClass('has-error');
      } else {
        this.$().closest('.form-group').addClass('has-error');
      }
    }
  },
  change() {
    this.send('parse', this.get('value'));
  },
  classNames: ['input-iso8601'],
  /**
   * REQUIRED.  Initialize the date text box and bind it to your model, component, or controller.
   */
  iso8601: '',
  /**
   * Don't assign anything to `value`.  Instead pass a proper iso8601 date string into the component's `iso8601`
   * attribute.
   * @private
   */
  value: '',
  valueFormat: 'LL',
  _setValue: Ember.on('init', Ember.observer('iso8601', function () {
    let value = null;
    if (Ember.isPresent(this.get('iso8601'))) {
      const parsedDate = new Date(this.get('iso8601'));
      if (Ember.isPresent(parsedDate) && isFinite(parsedDate)) {
        value = moment(parsedDate).format(this.get('valueFormat'));
      }
      Ember.trySet(this, 'value', value);
    }
  }))
});
