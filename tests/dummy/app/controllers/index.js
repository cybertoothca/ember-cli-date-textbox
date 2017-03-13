import Ember from 'ember';

export default Ember.Controller.extend({
  dateAsParam: new Date().toISOString(),
  dateWithTimezone: null,
  iso8601WithTimezone: '',
  naftaSigned: new Date(1987, 9, 3),
  now: new Date(),
  submittedIso8601: '',
  wasEmptyUntilNow: '',
  dateWithTimezoneISOString: Ember.computed('dateWithTimezone', function () {
    if (Ember.isPresent(this.get('dateWithTimezone'))) {
      return this.get('dateWithTimezone').toISOString();
    } else {
      return 'Choose A Date...';
    }
  })
});
