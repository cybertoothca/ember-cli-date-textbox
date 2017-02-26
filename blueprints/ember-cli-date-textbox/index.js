/*jshint node:true*/
module.exports = {
  description: 'A textbox that will guess the date you want and assign it to your model or query-params.',
  name: 'ember-cli-date-textbox',
  normalizeEntityName: function () {
  },
  included: function (app) {
    this._super.included(app);
    app.import(`${app.bowerDirectory}/date.js/build/date-en-US.js`);
    app.import(`${app.bowerDirectory}/moment/moment.js`);
    app.import(`${app.bowerDirectory}/moment-timezone/builds/moment-timezone-with-data.js`);
  // },
  // afterInstall: function (/*options*/) {
  //   return this.addBowerPackagesToProject([
  //     {name: 'date.js'},
  //     {name: 'moment'},
  //     {name: 'moment-timezone'}
  //   ]);
  }
};
