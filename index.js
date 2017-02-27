/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-date-textbox',
  included(app) {
    this._super.included(...arguments);
    app.import(app.bowerDirectory + '/Datejs/build/date-en-US.js');
    app.import(app.bowerDirectory + '/moment/moment.js');
  }
};
