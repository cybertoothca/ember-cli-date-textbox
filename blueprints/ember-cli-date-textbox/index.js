/*jshint node:true*/
module.exports = {
  name: 'ember-cli-date-textbox',
  description: 'A textbox that will guess the date you want and assign it to your model or query-params.',
  included: function (app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/showdown/dist/showdown.js');
    app.import(app.bowerDirectory + '/underscore.string/dist/underscore.string.js');
  },
  // afterInstall: function (/*options*/) {
  //   return this.addBowerPackagesToProject([
  //     {name: 'date.js'},
  //     {name: 'moment'},
  //     {name: 'moment-timezone'}
  //   ]);
  // }
};
