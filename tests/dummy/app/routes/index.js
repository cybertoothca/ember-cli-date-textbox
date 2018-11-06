import { isPresent } from '@ember/utils';
import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    submitDate() {
      const dateString = isPresent(this.get('controller.submittedDate')) ?
        this.get('controller.submittedDate').toString() : null;
      window.alert(`Form was submitted and this is the String value: ${dateString}`);
      return false;
    },
    submitIso8601() {
      window.alert(`Form was submitted and this is the String value: ${this.get('controller.submittedIso8601')}`);
      return false;
    }
  },
  queryParams: {
    dateAsParam: { refreshModel: false },
    iso8601WithTimezone: { refreshModel: false },
    submittedIso8601: { refreshModel: false },
    wasEmptyUntilNow: { refreshModel: false }
  }
});
