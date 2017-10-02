/* global Sugar */
import Ember from 'ember';
import InputText from 'ember-cli-text-support-mixins/components/input-text';
import moment from 'moment';

/**
 * Don't use for Ember query params until they start handling objects.
 * Need support for query params, use the `{{input-iso8601}}` component instead.
 */
export default InputText.extend({
  actions: {
    parse(value) {
      if (Ember.isBlank(value)) {
        // the text representation of the date has been cleared
        // clear error style-class
        this.$().closest('.form-group').removeClass('has-error');
        // set the `date` behind the now cleared value to null or if it is already null,
        // trigger that the property changed anyway
        if (this.get('date') === null) {
          this.notifyPropertyChange('date');
        } else {
          Ember.trySet(this, 'date', null);
        }
        return true;
      }

      // attempt to parse the not blank string value to a date; if it can't parse `null` is returned
      const sugarDate = Sugar.Date.create(value, {future: this.get('future?'), past: this.get('past?')});
      let parsedDate = Sugar.Date.isValid(sugarDate) ? moment(sugarDate).toDate() : null;
      if (parsedDate === null) {
        // add the error style-class
        this.$().closest('.form-group').addClass('has-error');
      } else {
        // clear error style-class
        this.$().closest('.form-group').removeClass('has-error');
        // date successfully parsed; now put it into the timezone assigned to this input
        parsedDate = moment.tz(moment(parsedDate).toArray(), this.get('timezone')).toDate();
      }
      // set the `date` property
      if ((this.get('date') - parsedDate) === 0) {
        // the date has not changed; however we want to force the date changed observer to fire anyway
        this.notifyPropertyChange('date');
      } else {
        Ember.trySet(this, 'date', parsedDate);
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
    component.send('parse', component.get('value'));
  },
  /**
   * The textbox value changed; trigger a parse of the value.
   */
  change(/*event*/) {
    this._super(...arguments);
    this.send('parse', this.get('value'));
  },
  classNames: ['input-date'],
  'ctrlEnterSubmitsForm?': true,
  /**
   * REQUIRED.  Initialize the date text box and bind it to your model, component, or controller.
   */
  date: undefined,
  /**
   * The format mask to apply to the date once it's been parsed.  The formatted date will
   * appear in the textbox while the actual date value behind it is in the `date` property.
   */
  displayFormat: 'LL',
  'enterWillSubmitForm?': false,
  /**
   * If `true`, ambiguous dates like `Sunday` will be parsed as `next Sunday`.  Note that
   * non-ambiguous dates are not guaranteed to be in the future.  Default is `false`.
   *
   * @see https://sugarjs.com/docs/#/Date/create
   */
  'future?': false,
  /**
   * The user pressed enter in the text box; trigger a parse.
   */
  insertNewline(/*event*/) {
    this._super(...arguments);
    this.send('parse', this.get('value'));
  },
  /**
   * If `true`, ambiguous dates like `Sunday` will be parsed as `last Sunday`. Note that non-ambiguous
   * dates are not guaranteed to be in the past. Default is `false`.
   *
   * @see https://sugarjs.com/docs/#/Date/create
   */
  'past?': false,
  /**
   * By default guess the client's timezone.
   */
  timezone: moment.tz.guess(),
  /**
   * Don't assign anything to `value`.  Instead pass a proper date into the component's `date` attribute.
   * @private
   */
  value: '',
  /**
   * @deprecated please use #displayFormat instead.
   */
  valueFormat: Ember.computed.deprecatingAlias('displayFormat', {
    id: 'input-date.deprecate-valueFormat',
    until: '1.2.0'
  }),
  /**
   * Every time the `date` property changes, attempt to format the `date` to the String value represented by
   * the `displayFormat` mask.  If the `date` is not present or is not of `date` type, the formatted value
   * will be set to empty-string.
   */
  _setValue: Ember.on('init', Ember.observer('date', function () {
    let formattedValue = '';
    if (Ember.isPresent(this.get('date')) && Ember.typeOf(this.get('date')) === 'date') {
      formattedValue = moment(this.get('date')).tz(this.get('timezone')).format(this.get('displayFormat'));
    }
    Ember.trySet(this, 'value', formattedValue);
  }))
});
