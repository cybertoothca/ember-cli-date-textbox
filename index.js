/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-date-textbox',
  included(app) {
    this._super.included(...arguments);
    app.import(app.bowerDirectory + '/datejs-parse-plus/build/date.js');
  }
};
