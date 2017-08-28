/* global moment */
import Ember from 'ember';
import InputText from 'ember-cli-text-support-mixins/components/input-text';

export default InputText.extend({
  actions: {
    parse(value) {
      if (Ember.isBlank(value)) {
        // the text representation of the date has been cleared
        // clear error style-class
        this.$().closest('.form-group').removeClass('has-error');
        // set the `iso8601` behind the now cleared value to empty-string
        // if it is already empty-string notify the iso8601 was changed
        if (this.get('iso8601') === '') {
          this.notifyPropertyChange('iso8601');
        } else {
          Ember.trySet(this, 'iso8601', '');
        }
        return true;
      }

      // attempt to parse the not blank string value to a date; if it can't parse `null` is returned
      let parsedDate = Date.parsePlus(value);
      let iso8601 = '';
      if (parsedDate === null) {
        // add the error style-class
        this.$().closest('.form-group').addClass('has-error');
      } else {
        // clear error style-class
        this.$().closest('.form-group').removeClass('has-error');
        // date successfully parsed; now put it into the timezone assigned to this input
        parsedDate = moment.tz(moment(parsedDate).toArray(), this.get('timezone'));
        iso8601 = parsedDate.toISOString();
      }
      // set the `iso8601` property
      if (this.get('iso8601') === iso8601) {
        // the iso8601 has not changed; however we want to force the iso8601 observer to fire anyway
        this.notifyPropertyChange('iso8601');
      } else {
        Ember.trySet(this, 'iso8601', iso8601);
      }
      return true;
    }
  },
  /**
   * After `ESCAPE` is pressed and the text is cleared; immediately trigger a parse.
   * @param event
   * @param component
   */
  afterClearAction(event, component) {
    component.send('parse', '');
  },
  /**
   * The textbox value changed; trigger a parse of the value.
   */
  change(/*event*/) {
    this._super(...arguments);
    this.send('parse', this.get('value'));
  },
  classNames: ['input-iso8601'],
  'ctrlEnterSubmitsForm?': true,
  /**
   * The format mask to apply to the date once it's been parsed.  The formatted date will
   * appear in the textbox while the actual date's ISO8601 string value will be in the
   * `iso8601` property.
   */
  displayFormat: 'LL',
  'enterWillSubmitForm?': false,
  /**
   * The user pressed enter in the text box; trigger a parse.
   */
  insertNewline(/*event*/) {
    this._super(...arguments);
    this.send('parse', this.get('value'));
  },
  /**
   * REQUIRED.  Initialize the date text box and bind it to your model, component, or controller.
   */
  iso8601: '',
  /**
   * By default guess the client's timezone.
   */
  timezone: moment.tz.guess(),
  /**
   * Don't assign anything to `value`.  Instead pass a proper iso8601 date string into the component's `iso8601`
   * attribute.
   * @private
   */
  value: '',
  /**
   * @deprecated please use #displayFormat instead.
   */
  valueFormat: Ember.computed.deprecatingAlias('displayFormat', {
    id: 'input-iso8601.deprecate-valueFormat',
    until: '1.2.0'
  }),
  /**
   * Every time the `iso8601` property changes, attempt to format it to the String value matching
   * the `displayFormat` mask.  If `iso8601` is not present or is not of `date` type, the formatted value
   * will be set to empty-string.
   */
  _setValue: Ember.on('init', Ember.observer('iso8601', function () {
    let formattedValue = '';
    if (Ember.isPresent(this.get('iso8601'))) {
      const parsedDate = new Date(this.get('iso8601'));
      // try to format the date if it is present and resolved to a real date (finite)
      if (Ember.isPresent(parsedDate) && isFinite(parsedDate)) {
        formattedValue = moment(parsedDate).tz(this.get('timezone')).format(this.get('displayFormat'));
      }
    }
    Ember.trySet(this, 'value', formattedValue);
  }))
});
