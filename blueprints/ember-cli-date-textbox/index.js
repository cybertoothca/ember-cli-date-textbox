/*jshint node:true*/
module.exports = {
  description: 'A textbox that will guess the date you want and assign it to your model or query-params.',
  name: 'ember-cli-date-textbox',
  normalizeEntityName: function () {
  },
  afterInstall: function (/*options*/) {
    return this.addBowerPackagesToProject([
      {name: 'date.js'},
      {name: 'moment'},
      {name: 'moment-timezone'}
    ]);
  }
};
