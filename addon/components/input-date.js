/* global moment */
import Ember from 'ember';

/**
 * Don't use for Ember query params until they start handling objects.
 * Need support for query params, use the `{{input-iso8601}}` component instead.
 */
export default Ember.TextField.extend({
  actions: {
    parse(value) {
      const parsedDate = Date.parsePlus(value);
      if (parsedDate === null) {
        this.$().closest('.form-group').addClass('has-error');
      } else {
        this.$().closest('.form-group').removeClass('has-error');
      }
      Ember.trySet(this, 'date', parsedDate);
    }
  },
  change() {
    this.send('parse', this.get('value'));
  },
  classNames: ['input-date'],
  /**
   * REQUIRED.  Initialize the date text box and bind it to your model, component, or controller.
   */
  date: undefined,
  /**
   * Don't assign anything to `value`.  Instead pass a proper date into the component's `date` attribute.
   * @private
   */
  value: '',
  valueFormat: 'LL',
  _setValue: Ember.on('init', Ember.observer('date', function () {
    let value = null;
    if (Ember.isPresent(this.get('date')) && Ember.typeOf(this.get('date')) === 'date') {
      value = moment(this.get('date')).format(this.get('valueFormat'));
    }
    Ember.trySet(this, 'value', value);
  }))
});
