/* global Sugar */
import { trySet } from '@ember/object';
import { isBlank, isPresent } from '@ember/utils';
import InputText from 'ember-cli-text-support-mixins/components/input-text';
import moment from 'moment';

export default InputText.extend({
  actions: {
    parse(value) {
      if (isBlank(value)) {
        // the text representation of the date has been cleared
        // clear error style-class
        this.$().closest('.form-group').removeClass('has-error');
        // set the `iso8601` behind the now cleared value to empty-string
        // if it is already empty-string notify the iso8601 was changed
        if (this.get('iso8601') === '') {
          this.notifyPropertyChange('iso8601');
        } else {
          trySet(this, 'iso8601', '');
        }
        // trigger the afterParseSuccess action since the value and date was cleared
        this.get('afterParseSuccess')(this);
        return true;
      }

      // attempt to parse the not blank string value to a date; if it can't parse `null` is returned
      const sugarDate = Sugar.Date.create(value, { future: this.get('future?'), past: this.get('past?') });
      let parsedDate = Sugar.Date.isValid(sugarDate) ? moment(sugarDate).toDate() : null;
      let iso8601 = '';
      if (parsedDate === null) {
        // add the error style-class
        this.$().closest('.form-group').addClass('has-error');
      } else {
        // clear error style-class
        this.$().closest('.form-group').removeClass('has-error');
        // date successfully parsed; now put it into the timezone assigned to this input
        const parsedMoment = moment.tz(moment(parsedDate).toArray(), this.get('timezone'));
        if (this.get('endOfDay?')) {
          parsedMoment.endOf('day');
        }
        if (this.get('startOfDay?')) {
          parsedMoment.startOf('day');
        }
        parsedDate = parsedMoment;
        iso8601 = parsedDate.toISOString();
      }
      // set the `iso8601` property
      if (this.get('iso8601') === iso8601) {
        // the iso8601 has not changed; however we want to force the iso8601 observer to fire anyway
        this.notifyPropertyChange('iso8601');
      } else {
        trySet(this, 'iso8601', iso8601);
      }
      // determine which after-action to triggered based on the parsedDate value
      if (parsedDate === null) {
        this.get('afterParseFail')(this);
      } else {
        this.get('afterParseSuccess')(this);
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
   * Assign an action that will be triggered after failing to parse the date.  You will passed this
   * component as an argument.
   */
  afterParseFail(/*inputDateComponent*/) {
    // override accordingly
  },

  /**
   * Assign an action that will be triggered after successfully parsing a date.  You will passed this
   * component as an argument.
   */
  afterParseSuccess(/*inputDateComponent*/) {
    // override accordingly
  },

  /**
   * Assign an action that will be triggered before attempting to parse the date.  You will passed this
   * component as an argument.
   */
  beforeParse(/*inputDateComponent*/) {
    // override accordingly
  },

  /**
   * The textbox value changed; trigger a parse of the value.
   */
  change(/*event*/) {
    this._super(...arguments);
    this._parse();
  },

  classNames: ['input-iso8601'],

  'ctrlEnterSubmitsForm?': true,

  /**
   * Every time the `iso8601` property changes, attempt to format it to the String value matching
   * the `displayFormat` mask.  If `iso8601` is not present or is not of `date` type, the formatted value
   * will be set to empty-string.
   */
  didReceiveAttrs() {
    if (isPresent(this.get('iso8601'))) {
      const parsedDate = new Date(this.get('iso8601'));
      // try to format the date if it is present and resolved to a real date (finite)
      if (isPresent(parsedDate) && isFinite(parsedDate)) {
        trySet(this, 'value', moment(parsedDate).tz(this.get('timezone')).format(this.get('displayFormat')));
      }
    }
  },

  /**
   * The format mask to apply to the date once it's been parsed.  The formatted date will
   * appear in the textbox while the actual date's ISO8601 string value will be in the
   * `iso8601` property.
   */
  displayFormat: 'LL',

  /**
   * When `true`, the parsed date will have its time component set to the last moment of the day.
   * Defaults to `false`.
   */
  'endOfDay?': false,

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
    this._parse();
  },

  /**
   * REQUIRED.  Initialize the date text box and bind it to your model, component, or controller.
   */
  iso8601: '',

  /**
   * If `true`, ambiguous dates like `Sunday` will be parsed as `last Sunday`. Note that non-ambiguous
   * dates are not guaranteed to be in the past. Default is `false`.
   *
   * @see https://sugarjs.com/docs/#/Date/create
   */
  'past?': false,

  /**
   * When `true`, the parsed date will have its time component set to the first moment of the day.  The `startOfDay?`
   * option takes precedence over the `endOfDay?` option; if both are set to `true` the start of day logic will
   * take precedence.
   * Defaults to `false`.
   */
  'startOfDay?': false,

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

  _parse() {
    this.get('beforeParse')(this);
    this.send('parse', this.get('value'));
  }
});
