/*jshint node:true*/
module.exports = {
  description: 'A textbox that will guess the date you want and assign it to your model or query-params.',
  name: 'ember-cli-date-textbox',
  normalizeEntityName: function () {
  },
  afterInstall: function (/*options*/) {
    var self = this;
    return self.addAddonToProject('ember-cli-text-support-mixins')
      .then(function () {
        return self.addBowerPackagesToProject([
          {name: 'datejs-parse-plus'},
          {name: 'moment'},
          {name: 'moment-timezone'}
        ]);
      });
  }
};
