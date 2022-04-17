import { hash } from 'rsvp';

import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return hash({
      naftaSigned: new Date(1987, 9, 3),
      now: new Date(),
    });
  },

  queryParams: {
    dateAsParam: { refreshModel: false },
    iso8601WithTimezone: { refreshModel: false },
    submittedIso8601: { refreshModel: false },
    wasEmptyUntilNow: { refreshModel: false },
  },
});
