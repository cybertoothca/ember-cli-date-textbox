/* global moment */
import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

// create a test class variable that will hold your frozen clock
let CLOCK = null;

moduleForComponent('input-iso8601', 'Integration | Component | input iso8601', {
  integration: true,
  afterEach: function () {
    if (CLOCK) {
      CLOCK.restore();
    }
  }
});

test('when `past?` set to false requesting `jan` will STILL be in the past', function (assert) {
  // forcing TODAY's date to Sept 11, 2001
  CLOCK = sinon.useFakeTimers(new Date(2001, 8, 11).getTime());

  this.set('iso8601', null);
  this.render(hbs`{{input-iso8601 iso8601=iso8601 displayFormat="llll z" past?=false timezone="America/Edmonton"}}`);

  assert.equal(this.$('input').val().trim(), '');

  this.$('input')
    .val('jan')
    .trigger('change');
  assert.equal(this.$('input').val().trim(), 'Mon, Jan 1, 2001 12:00 AM MST');
  assert.equal(this.get('iso8601'), '2001-01-01T07:00:00.000Z');
});

test('when `past?` set to true requesting `jan` will be in the past', function (assert) {
  // forcing TODAY's date to Sept 11, 2001
  CLOCK = sinon.useFakeTimers(new Date(2001, 8, 11).getTime());

  this.set('iso8601', null);
  this.render(hbs`{{input-iso8601 iso8601=iso8601 displayFormat="llll z" past?=true timezone="America/Edmonton"}}`);

  assert.equal(this.$('input').val().trim(), '');

  this.$('input')
    .val('jan')
    .trigger('change');
  assert.equal(this.$('input').val().trim(), 'Mon, Jan 1, 2001 12:00 AM MST');
  assert.equal(this.get('iso8601'), '2001-01-01T07:00:00.000Z');
});

test('when `future?` set to false requesting `jan` will be in the past', function (assert) {
  // forcing TODAY's date to Sept 11, 2001
  CLOCK = sinon.useFakeTimers(new Date(2001, 8, 11).getTime());

  this.set('iso8601', null);
  this.render(hbs`{{input-iso8601 iso8601=iso8601 displayFormat="llll z" future?=false timezone="America/Edmonton"}}`);

  assert.equal(this.$('input').val().trim(), '');

  this.$('input')
    .val('jan')
    .trigger('change');
  assert.equal(this.$('input').val().trim(), 'Mon, Jan 1, 2001 12:00 AM MST');
  assert.equal(this.get('iso8601'), '2001-01-01T07:00:00.000Z');
});

test('when `future?` set to true requesting `jan` will be in the future', function (assert) {
  // forcing TODAY's date to Sept 11, 2001
  CLOCK = sinon.useFakeTimers(new Date(2001, 8, 11).getTime());

  this.set('iso8601', null);
  this.render(hbs`{{input-iso8601 iso8601=iso8601 displayFormat="llll z" future?=true timezone="America/Edmonton"}}`);

  assert.equal(this.$('input').val().trim(), '');

  this.$('input')
    .val('jan')
    .trigger('change');
  assert.equal(this.$('input').val().trim(), 'Tue, Jan 1, 2002 12:00 AM MST');
  assert.equal(this.get('iso8601'), '2002-01-01T07:00:00.000Z');
});

test('when the default timezone is used for Sept 11 2001 at noon', function (assert) {
  this.set('iso8601', new Date(2001, 8, 11, 12).toISOString());
  this.render(hbs`{{input-iso8601 iso8601=iso8601 displayFormat="llll z"}}`);
  assert.equal(this.$('input').val().trim(), moment(this.get('iso8601')).tz(moment.tz.guess()).format('llll z'));
});

test('when assigning a date for Sept 11 2001 at noon in New York', function (assert) {
  this.set('iso8601', moment.tz([2001, 8, 11, 12], 'America/New_York').toISOString());
  this.render(hbs`{{input-iso8601 iso8601=iso8601 displayFormat="llll z" timezone="America/New_York"}}`);
  assert.equal(this.$('input').val().trim(), 'Tue, Sep 11, 2001 12:00 PM EDT');
});

test('when parsing a date for Sep 11, 2001 at 4pm in New York', function (assert) {
  this.set('iso8601', null);
  this.render(hbs`{{input-iso8601 iso8601=iso8601 displayFormat="llll z" timezone="America/New_York"}}`);
  assert.equal(this.$('input').val().trim(), '');
  this.$('input')
    .val('sep 11 2001 4pm')
    .trigger('change');
  assert.equal(this.$('input').val().trim(), 'Tue, Sep 11, 2001 4:00 PM EDT');
  assert.equal(this.get('iso8601'), '2001-09-11T20:00:00.000Z');
});

test('when assigning a date for Sept 11 2001 at noon in Vancouver', function (assert) {
  this.set('iso8601', moment.tz([2001, 8, 11, 12], 'America/Vancouver').toISOString());
  this.render(hbs`{{input-iso8601 iso8601=iso8601 displayFormat="llll z" timezone="America/Vancouver"}}`);
  assert.equal(this.$('input').val().trim(), 'Tue, Sep 11, 2001 12:00 PM PDT');
});

test('when parsing a date for Sep 11, 2001 at 4pm in Vancouver', function (assert) {
  this.set('iso8601', null);
  this.render(hbs`{{input-iso8601 iso8601=iso8601 displayFormat="llll z" timezone="America/Vancouver"}}`);
  assert.equal(this.$('input').val().trim(), '');
  this.$('input')
    .val('sep 11 2001 4pm')
    .trigger('change');
  assert.equal(this.$('input').val().trim(), 'Tue, Sep 11, 2001 4:00 PM PDT');
  assert.equal(this.get('iso8601'), '2001-09-11T23:00:00.000Z');
});

test('when initializing with null the text value remains empty', function (assert) {
  this.set('iso8601', null);
  this.render(hbs`{{input-iso8601 iso8601=iso8601}}`);
  assert.equal(this.$('input').val().trim(), '');
});

test('when initializing with empty string the text value remains empty', function (assert) {
  this.set('iso8601', '');
  this.render(hbs`{{input-iso8601 iso8601=iso8601}}`);
  assert.equal(this.$('input').val().trim(), '');
});

test('when initializing with a date the text value formats to LL', function (assert) {
  this.set('iso8601', new Date(2001, 8, 11).toISOString());
  this.render(hbs`{{input-iso8601 iso8601=iso8601}}`);
  assert.equal(this.$('input').val().trim(), 'September 11, 2001');
});

test('when initializing with a date the text value formats to whatever format is supplied', function (assert) {
  this.set('iso8601', new Date(2001, 8, 11).toISOString());
  this.render(hbs`{{input-iso8601 iso8601=iso8601 displayFormat="ll"}}`);
  assert.equal(this.$('input').val().trim(), 'Sep 11, 2001');
});

test('when clearing the value the iso8601 property is set to empty string', function (assert) {
  let sep11 = new Date(2001, 8, 11).toISOString();
  this.set('iso8601', sep11);
  this.render(hbs`{{input-iso8601 iso8601=iso8601 displayFormat="ll"}}`);
  assert.equal(this.$('input').val().trim(), 'Sep 11, 2001');
  this.$('input')
    .val('')
    .trigger('change');
  assert.equal(this.get('iso8601'), '');
});

test('when parsing `sep 11 2001` to an iso8601 string', function (assert) {
  this.set('iso8601', '');
  this.render(hbs`{{input-iso8601 displayFormat="LL" iso8601=iso8601}}`);
  assert.equal(this.get('iso8601'), '');
  this.$('input')
    .val('sep 11 2001')
    .trigger('change');
  assert.equal(this.$('input').val(), 'September 11, 2001');
  assert.equal(this.get('iso8601'), new Date(2001, 8, 11).toISOString());
});

test('when typing `bla` the iso8601 parsing fails silently', function (assert) {
  this.set('iso8601', new Date(2001, 8, 11).toISOString());
  this.render(hbs`{{input-iso8601 iso8601=iso8601 displayFormat="ll"}}`);
  assert.equal(this.$('input').val(), 'Sep 11, 2001');
  this.$('input')
    .val('bla')
    .trigger('change');
  assert.equal(this.$('input').val(), '');
  assert.equal(this.get('iso8601'), '');
});
