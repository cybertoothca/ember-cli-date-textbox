/* eslint-env node */
'use strict';

module.exports = function (/* environment, appConfig */) {
  return {
    moment: {
      // Options:
      // 'all' - all years, all timezones
      // '2010-2020' - 2010-2020, all timezones
      // 'none' - no data, just timezone API
      includeTimezone: 'all',
    },
  };
};
