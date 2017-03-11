import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    submitDate() {
      const dateString = Ember.isPresent(this.get('controller.submittedDate')) ?
        this.get('controller.submittedDate').toString() : null;
      window.alert(`Form was submitted and this is the String value: ${dateString}`);
    },
    submitIso8601() {
      window.alert(`Form was submitted and this is the String value: ${this.get('controller.submittedIso8601')}`);
    }
  },
  queryParams: {
    dateAsParam: {refreshModel: false},
    submittedIso8601: {refreshModel: false},
    wasEmptyUntilNow: {refreshModel: false}
  }
});
