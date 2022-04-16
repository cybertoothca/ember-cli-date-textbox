import { readOnly } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import moment from 'moment';

/**
 * Simple mixin to share a bunch of the properties between the `input-date` & `input-iso8601` components.
 */
export default Mixin.create({
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
   * CTRL+ENTER will submit the closest form.
   */
  'ctrlEnterSubmitsForm?': true,

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

  /**
   * Pressing ENTER will never submit the closest form.
   */
  'enterWillSubmitForm?': readOnly('_enterWillNeverSubmitForm'),

  /**
   * If `true`, ambiguous dates like `Sunday` will be parsed as `next Sunday`.  Note that
   * non-ambiguous dates are not guaranteed to be in the future.  Default is `false`.
   *
   * @see https://sugarjs.com/docs/#/Date/create
   */
  'future?': false,

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

  _enterWillNeverSubmitForm: false,

  _processTimezoneAndTimeOfDay(parsedDate) {
    // date successfully parsed; now put it into the timezone assigned to this input
    const parsedMoment = moment.tz(moment(parsedDate).toArray(), this.timezone);
    if (this['endOfDay?']) {
      parsedMoment.endOf('day');
    }
    if (this['startOfDay?']) {
      parsedMoment.startOf('day');
    }
    return parsedMoment.toDate();
  },

  /**
   * Trigger the appropriate post-parse action.
   * @param isFailedParse
   * @private
   */
  _triggerPostParseEvents(isFailedParse) {
    // determine which after-action to triggered based on the parsedDate value
    if (isFailedParse) {
      this.afterParseFail(this);
    } else {
      this.afterParseSuccess(this);
    }
  },
});
