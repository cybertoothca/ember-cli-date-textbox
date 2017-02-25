import Ember from 'ember';

export default Ember.TextField.extend({
  actions: {
    parse() {
      const parsedDate = Date.parse(this.get('value'));
      const iso8601 = Ember.isPresent(parsedDate) ? parsedDate.toISOString() : '';
      Ember.trySet(this, 'iso8601', iso8601);

      if (Ember.isPresent(parsedDate) || Ember.isBlank(this.get('value'))) {
        this.$().closest('.form-group').removeClass('has-error');
      } else {
        this.$().closest('.form-group').addClass('has-error');
      }
    }
  },
  change() {
    this.send('parse');
  },
  /**
   * REQUIRED.  Initialize the date text box and bind it to your model, component, or controller.
   */
  iso8601: '',
  valueFormat: 'LL',
  _setValue: Ember.on('init', Ember.observer('iso8601', function () {
    let value = null;
    const parsedDate = new Date(this.get('iso8601'));
    if (Ember.isPresent(parsedDate) && isFinite(parsedDate)) {
      value = moment(parsedDate).format(this.get('valueFormat'));
    }
    Ember.trySet(this, 'value', value);
  }))
});
