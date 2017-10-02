import Ember from 'ember';

export default Ember.Controller.extend({
  ambiguousFuture: null,
  ambiguousFutureISOString: Ember.computed('ambiguousFuture', function () {
    if (Ember.isPresent(this.get('ambiguousFuture'))) {
      return this.get('ambiguousFuture').toISOString();
    } else {
      return 'Type A Date...';
    }
  }),

  dateAsParam: new Date().toISOString(),
  dateWithTimezone: null,
  dateWithTimezoneISOString: Ember.computed('dateWithTimezone', function () {
    if (Ember.isPresent(this.get('dateWithTimezone'))) {
      return this.get('dateWithTimezone').toISOString();
    } else {
      return 'Choose A Date...';
    }
  }),
  demoDate: null,
  demoDateISOString: Ember.computed('demoDate', function () {
    if (Ember.isPresent(this.get('demoDate'))) {
      return this.get('demoDate').toISOString();
    } else {
      return 'Choose A Date...';
    }
  }),
  iso8601WithTimezone: '',
  naftaSigned: new Date(1987, 9, 3),
  now: new Date(),
  submittedIso8601: '',
  wasEmptyUntilNow: ''
});
