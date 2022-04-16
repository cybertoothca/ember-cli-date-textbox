import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  ambiguousFuture: null,

  ambiguousFutureISOString: computed('ambiguousFuture', function () {
    if (isPresent(this.ambiguousFuture)) {
      return this.ambiguousFuture.toISOString();
    } else {
      return 'Type A Date...';
    }
  }),

  dateAsParam: new Date().toISOString(),

  dateWithTimezone: null,

  dateWithTimezoneISOString: computed('dateWithTimezone', function () {
    if (isPresent(this.dateWithTimezone)) {
      return this.dateWithTimezone.toISOString();
    } else {
      return 'Choose A Date...';
    }
  }),

  demoDate: null,

  demoDateISOString: computed('demoDate', function () {
    if (isPresent(this.demoDate)) {
      return this.demoDate.toISOString();
    } else {
      return 'Choose A Date...';
    }
  }),

  iso8601WithTimezone: '',

  submittedIso8601: '',

  wasEmptyUntilNow: '',
});
