import Ember from 'ember';

export default Ember.Controller.extend({
  dateAsParam: new Date().toISOString(),
  naftaSigned: new Date(1987, 9, 3),
  now: new Date(),
  submittedIso8601: '',
  wasEmptyUntilNow: ''
});
