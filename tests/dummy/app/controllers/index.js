import Ember from 'ember';

export default Ember.Controller.extend({
  dateAsParam: moment().startOf('day').toISOString(),
  queryParams: ['dateAsParam'],
  naftaSigned: new Date(1987, 9, 3),
  now: new Date()
});
