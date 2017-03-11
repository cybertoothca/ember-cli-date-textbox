/* global moment */
import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('input-date', 'Integration | Component | input date', {
  integration: true
});

test('when the default timezone is used for Sept 11 2001 at noon', function (assert) {
  this.set('date', new Date(2001, 8, 11, 12));
  this.render(hbs`{{input-date date=date displayFormat="llll z"}}`);
  assert.equal(this.$('input').val().trim(), moment(this.get('date')).tz(moment.tz.guess()).format('llll z'));
});

test('when assigning a date for Sep 11, 2001 at noon in New York', function (assert) {
  this.set('date', moment.tz([2001, 8, 11, 12], 'America/New_York').toDate());
  this.render(hbs`{{input-date date=date displayFormat="llll z" timezone="America/New_York"}}`);
  assert.equal(this.$('input').val().trim(), 'Tue, Sep 11, 2001 12:00 PM EDT');
});

test('when parsing a date for Sep 11, 2001 at 4pm in New York', function (assert) {
  this.set('date', null);
  this.render(hbs`{{input-date date=date displayFormat="llll z" timezone="America/New_York"}}`);
  assert.equal(this.$('input').val().trim(), '');
  this.$('input')
    .val('sep 11 2001 4pm')
    .trigger('change');
  assert.equal(this.$('input').val().trim(), 'Tue, Sep 11, 2001 4:00 PM EDT');
  assert.equal(this.get('date').toISOString(), '2001-09-11T20:00:00.000Z');
});

test('when assigning a date for Sep 11, 2001 at noon in Vancouver', function (assert) {
  this.set('date', moment.tz([2001, 8, 11, 12], 'America/Vancouver').toDate());
  this.render(hbs`{{input-date date=date displayFormat="llll z" timezone="America/Vancouver"}}`);
  assert.equal(this.$('input').val().trim(), 'Tue, Sep 11, 2001 12:00 PM PDT');
});

test('when parsing a date for Sep 11, 2001 at 4pm in Vancouver', function (assert) {
  this.set('date', null);
  this.render(hbs`{{input-date date=date displayFormat="llll z" timezone="America/Vancouver"}}`);
  assert.equal(this.$('input').val().trim(), '');
  this.$('input')
    .val('sep 11 2001 4pm')
    .trigger('change');
  assert.equal(this.$('input').val().trim(), 'Tue, Sep 11, 2001 4:00 PM PDT');
  assert.equal(this.get('date').toISOString(), '2001-09-11T23:00:00.000Z');
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
  this.render(hbs`{{input-date date=date displayFormat="ll"}}`);
  assert.equal(this.$('input').val().trim(), 'Sep 11, 2001');
});

test('when clearing the value the date is set to null', function (assert) {
  let sep11 = new Date(2001, 8, 11);
  this.set('date', sep11);
  this.render(hbs`{{input-date date=date displayFormat="LL"}}`);
  assert.equal(this.$('input').val().trim(), 'September 11, 2001');
  assert.equal(this.get('date'), sep11);
  this.$('input')
    .val('')
    .trigger('change');
  assert.equal(this.get('date'), null);
});

test('when parsing `sep 11 2001` to a date', function (assert) {
  this.set('date', null);
  this.render(hbs`{{input-date displayFormat="LL" date=date}}`);
  assert.equal(this.get('date'), null);
  this.$('input')
    .val('sep 11 2001')
    .trigger('change');
  assert.equal(this.$('input').val(), 'September 11, 2001');
  assert.equal(this.get('date').toString(), new Date(2001, 8, 11).toString());
});

// Cannot get this test to work; might need to do it with an acceptance test
skip('when typing `bla` the date is parsing fails silently', function (assert) {
  this.render(hbs`{{input-date displayFormat="LL"}}`);
  this.$('input')
    .val('bla')
    .trigger('change');
  return wait().then(() => {
    assert.equal(this.$('input').val(), '');
    assert.equal(this.$().html(), '');
  });
});
