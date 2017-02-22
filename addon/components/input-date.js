import Ember from 'ember';

export default Ember.TextField.extend({
  actions: {
    parse() {
      const parsedDate = Date.parse(this.get('value'));
      if (parsedDate === null) {
        this.$().closest('.form-group').addClass('has-error');
      } else {
        this.$().closest('.form-group').removeClass('has-error');
      }
      Ember.trySet(this, 'date', parsedDate);
    }
  },
  change() {
    this.send('parse');
  },
  /**
   * Optional.  Initialize the date text box.
   */
  date: undefined,
  valueFormat: 'LL',
  _setValue: Ember.on('init', Ember.observer('date', function() {
    let value = null;
    if (Ember.isPresent(this.get('date')) && Ember.typeOf(this.get('date')) === 'date') {
      value = moment(this.get('date')).format(this.get('valueFormat'));
    }
    Ember.trySet(this, 'value', value);
  }))
});
