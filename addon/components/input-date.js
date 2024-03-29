import InputText from 'ember-cli-text-support-mixins/components/input-text';
import moment from 'moment-timezone';
import * as Sugar from 'sugar';

import { trySet } from '@ember/object';
import { isBlank, isPresent, typeOf } from '@ember/utils';

import DateTextboxEvents from '../mixins/-date-textbox-events';

/**
 * Don't use for Ember query params until they start handling objects.
 * Need support for query params, use the `{{input-iso8601}}` component instead.
 */
export default InputText.extend(DateTextboxEvents, {
  actions: {
    parse(value) {
      if (this._handleBlankTextInputValue(value)) {
        return true;
      }

      // attempt to parse the not blank string value to a date; if it can't parse `null` is returned
      const sugarDate = Sugar.Date.create(value, { future: this['future?'], past: this['past?'] });
      let parsedDate = Sugar.Date.isValid(sugarDate) ? moment(sugarDate).toDate() : null;

      parsedDate = this._processParsedDate(parsedDate);

      // set the `date` property
      if (this.date - parsedDate === 0) {
        // the date has not changed; however we want to force the date changed observer to fire anyway
        this.notifyPropertyChange('date');
      } else {
        trySet(this, 'date', parsedDate);
      }

      // determine which after-action to triggered based on the parsedDate value
      this._triggerPostParseEvents(parsedDate === null);

      return true;
    },
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
    this._parse();
  },

  classNames: ['input-date'],

  /**
   * REQUIRED.  Initialize the date text box and bind it to your model, component, or controller.
   */
  date: undefined,

  /**
   * Every time the `date` property changes, attempt to format the `date` to the String value represented by
   * the `displayFormat` mask.  If the `date` is not present or is not of `date` type nothing changes.
   */
  didReceiveAttrs() {
    if (isPresent(this.date) && typeOf(this.date) === 'date') {
      trySet(this, 'value', moment(this.date).tz(this.timezone).format(this.displayFormat));
    }
  },

  /**
   * The user pressed enter in the text box; trigger a parse.
   */
  insertNewline(/*event*/) {
    this._super(...arguments);
    this._parse();
  },

  /**
   * By default guess the client's timezone.
   */
  timezone: moment.tz.guess(),

  /**
   * Don't assign anything to `value`.  Instead pass a proper date into the component's `date` attribute.
   * @private
   */
  value: '',

  _handleBlankTextInputValue(value) {
    if (isBlank(value)) {
      // clear error style-class
      let formGroup = this.element.closest('.form-group');
      if (formGroup) {
        formGroup.classList.remove('has-error');
      }
      // set the `date` behind the now cleared value to null or if it is already null,
      // trigger that the property changed anyway
      if (this.date === null) {
        this.notifyPropertyChange('date');
      } else {
        trySet(this, 'date', null);
      }
      // trigger the afterParseSuccess action since the value and date was cleared
      this.afterParseSuccess(this);
      return true;
    }
    return false;
  },

  _parse() {
    this.beforeParse(this);
    this.send('parse', this.value);
  },

  _processParsedDate(parsedDate) {
    if (parsedDate === null) {
      // add the error style-class
      let formGroup = this.element.closest('.form-group');
      if (formGroup) {
        formGroup.classList.add('has-error');
      }
      return null;
    } else {
      // clear error style-class
      let formGroup = this.element.closest('.form-group');
      if (formGroup) {
        formGroup.classList.remove('has-error');
      }
      return this._processTimezoneAndTimeOfDay(parsedDate);
    }
  },
});
