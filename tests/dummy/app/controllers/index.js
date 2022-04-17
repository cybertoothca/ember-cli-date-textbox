import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Controller.extend({
  actions: {
    submitDate() {
      const dateString = isPresent(this.submittedDate) ? this.submittedDate.toString() : null;
      window.alert(`Form was submitted and this is the String value: ${dateString}`);
      return false;
    },
    submitIso8601() {
      window.alert(`Form was submitted and this is the String value: ${this.submittedIso8601}`);
      return false;
    },
  },

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
