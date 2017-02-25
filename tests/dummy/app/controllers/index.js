import Ember from 'ember';

export default Ember.Controller.extend({
  dateAsParam: moment().toISOString(),
  queryParams: ['dateAsParam', 'wasEmptyUntilNow'],
  naftaSigned: new Date(1987, 9, 3),
  now: new Date(),
  wasEmptyUntilNow: ''
});
