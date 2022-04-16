/* global Sugar */
import { trySet } from '@ember/object';
import { isBlank, isPresent } from '@ember/utils';
import DateTextboxEvents from '../mixins/-date-textbox-events';
import InputText from 'ember-cli-text-support-mixins/components/input-text';
import moment from 'moment';

export default InputText.extend(DateTextboxEvents, {
  actions: {
    parse(value) {
      if (this._handleBlankTextInputValue(value)) {
        return true;
      }

      // attempt to parse the not blank string value to a date; if it can't parse `null` is returned
      const sugarDate = Sugar.Date.create(value, { future: this['future?'], past: this['past?'] });
      let parsedDate = Sugar.Date.isValid(sugarDate) ? moment(sugarDate).toDate() : null;

      let iso8601 = this._processParsedDate(parsedDate);

      // set the `iso8601` property
      if (this.iso8601 === iso8601) {
        // the iso8601 has not changed; however we want to force the iso8601 observer to fire anyway
        this.notifyPropertyChange('iso8601');
      } else {
        trySet(this, 'iso8601', iso8601);
      }

      // determine which after-action to triggered based on the parsedDate value
      this._triggerPostParseEvents(parsedDate === null);

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
    this._parse();
  },

  classNames: ['input-iso8601'],

  /**
   * Every time the `iso8601` property changes, attempt to format it to the String value matching
   * the `displayFormat` mask.  If `iso8601` is not present or is not of `date` type, the formatted value
   * will be set to empty-string.
   */
  didReceiveAttrs() {
    if (isPresent(this.iso8601)) {
      const parsedDate = new Date(this.iso8601);
      // try to format the date if it is present and resolved to a real date (finite)
      if (isPresent(parsedDate) && isFinite(parsedDate)) {
        trySet(this, 'value', moment(parsedDate).tz(this.timezone).format(this.displayFormat));
      }
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

  _handleBlankTextInputValue(value) {
    if (isBlank(value)) {
      // the text representation of the date has been cleared
      // clear error style-class
      this.$().closest('.form-group').removeClass('has-error');
      // set the `iso8601` behind the now cleared value to empty-string
      // if it is already empty-string notify the iso8601 was changed
      if (this.iso8601 === '') {
        this.notifyPropertyChange('iso8601');
      } else {
        trySet(this, 'iso8601', '');
      }
      // trigger the afterParseSuccess action since the value and date was cleared
      this.afterParseSuccess(this);
      return true;
    }
    return false;
  },

  _processParsedDate(parsedDate) {
    let iso8601 = '';
    if (parsedDate === null) {
      // add the error style-class
      this.$().closest('.form-group').addClass('has-error');
    } else {
      // clear error style-class
      this.$().closest('.form-group').removeClass('has-error');
      iso8601 = this._processTimezoneAndTimeOfDay(parsedDate).toISOString();
    }
    return iso8601;
  },

  _parse() {
    this.beforeParse(this);
    this.send('parse', this.value);
  }
});
