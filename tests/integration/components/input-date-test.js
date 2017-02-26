import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('input-date', 'Integration | Component | input date', {
  integration: true
});

test('when initializing with null the text value remains empty', function (assert) {
  this.set('date', null);
  this.render(hbs`{{input-date date=date}}`);
  assert.equal(this.$('input').val().trim(), '');
});

test('when initializing with empty string the text value remains empty', function (assert) {
  this.set('date', '');
  this.render(hbs`{{input-date date=date}}`);
  assert.equal(this.$('input').val().trim(), '');
});

test('when initializing with a date the text value formats to LL', function (assert) {
  this.set('date', new Date(2001, 8, 11));
  this.render(hbs`{{input-date date=date}}`);
  assert.equal(this.$('input').val().trim(), 'September 11, 2001');
});

test('when initializing with a date the text value formats to whatever format is supplied', function (assert) {
  this.set('date', new Date(2001, 8, 11));
  this.render(hbs`{{input-date date=date valueFormat="ll"}}`);
  assert.equal(this.$('input').val().trim(), 'Sep 11, 2001');
});

skip('when clearing the value the date is set to null', function (assert) {
  let sep11 = new Date(2001, 8, 11);
  this.set('date', sep11);
  this.render(hbs`{{input-date date=date valueFormat="ll"}}`);
  assert.equal(this.$('input').val().trim(), 'Sep 11, 2001');
  this.$('input')
    .val('')
    .trigger('change');
  assert.equal(sep11, '');
  assert.notOk(Ember.isPresent(sep11), 'The sep11 variable should have been set to null after clearing the value');
});

skip('when typing `blablabla` the date is parsing fails silently', function (/*assert*/) {
});

skip('when typing `sep 11 2001` the date is parsed and assigned ', function (/*assert*/) {
});
