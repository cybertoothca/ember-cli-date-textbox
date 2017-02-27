/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-date-textbox',
  included(app) {
    this._super.included(...arguments);
    app.import(app.bowerDirectory + '/datejs-parse-plus/build/date.js');
    app.import(app.bowerDirectory + '/moment/moment.js');
  }
};
