/* global Sugar */
import { trySet } from '@ember/object';
import { isBlank, isPresent, typeOf } from '@ember/utils';
import InputText from 'ember-cli-text-support-mixins/components/input-text';
import moment from 'moment';

/**
 * Don't use for Ember query params until they start handling objects.
 * Need support for query params, use the `{{input-iso8601}}` component instead.
 */
export default InputText.extend({
  actions: {
    parse(value) {
      if (isBlank(value)) {
        // clear error style-class
        this.$().closest('.form-group').removeClass('has-error');
        // set the `date` behind the now cleared value to null or if it is already null,
        // trigger that the property changed anyway
        if (this.get('date') === null) {
          this.notifyPropertyChange('date');
        } else {
          trySet(this, 'date', null);
        }
        // trigger the afterParseSuccess action since the value and date was cleared
        this.get('afterParseSuccess')(this);
        return true;
      }

      // attempt to parse the not blank string value to a date; if it can't parse `null` is returned
      const sugarDate = Sugar.Date.create(value, { future: this.get('future?'), past: this.get('past?') });
      let parsedDate = Sugar.Date.isValid(sugarDate) ? moment(sugarDate).toDate() : null;
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
        parsedDate = parsedMoment.toDate();
      }
      // set the `date` property
      if ((this.get('date') - parsedDate) === 0) {
        // the date has not changed; however we want to force the date changed observer to fire anyway
        this.notifyPropertyChange('date');
      } else {
        trySet(this, 'date', parsedDate);
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
    component.send('parse', component.get('value'));
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

  classNames: ['input-date'],

  'ctrlEnterSubmitsForm?': true,

  /**
   * REQUIRED.  Initialize the date text box and bind it to your model, component, or controller.
   */
  date: undefined,

  /**
   * Every time the `date` property changes, attempt to format the `date` to the String value represented by
   * the `displayFormat` mask.  If the `date` is not present or is not of `date` type nothing changes.
   */
  didReceiveAttrs() {
    if (isPresent(this.get('date')) && typeOf(this.get('date')) === 'date') {
      trySet(this, 'value', moment(this.get('date')).tz(this.get('timezone')).format(this.get('displayFormat')));
    }
  },

  /**
   * The format mask to apply to the date once it's been parsed.  The formatted date will
   * appear in the textbox while the actual date value behind it is in the `date` property.
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
   * Don't assign anything to `value`.  Instead pass a proper date into the component's `date` attribute.
   * @private
   */
  value: '',

  _parse() {
    this.get('beforeParse')(this);
    this.send('parse', this.get('value'));
  }
});
