/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-date-textbox',
  options: {
    nodeAssets: {
      'sugar-date': {
        vendor: {
          srcDir: 'dist',
          destDir: 'ember-cli-date-textbox',
          include: ['sugar-date.js']
        }
      }
    }
  },
  included(app) {
    this._super.included(...arguments);
    app.import('vendor/ember-cli-date-textbox/sugar-date.js');
  }
};
