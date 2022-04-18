import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import moment from 'moment';
import { module, test } from 'qunit';

import { fillIn, find, render } from '@ember/test-helpers';

import { freezeTime, travelBack } from '../../mockdate-helpers';

module('Integration | Component | input iso8601', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(function () {
    travelBack();
  });

  test('when setting a parsed date to the very start of the day', async function (assert) {
    this.set('iso8601', null);
    await render(
      hbs`<InputIso8601 @displayFormat="llll z" @endOfDay?={{true}} @iso8601={{iso8601}} @past?={{false}} @startOfDay?={{true}} @timezone="America/Edmonton" />`
    );

    assert.equal(find('input').value.trim(), '');

    await fillIn('input', 'sep 11 2001');
    assert.equal(find('input').value.trim(), 'Tue, Sep 11, 2001 12:00 AM MDT');
    assert.equal(this.get('iso8601'), '2001-09-11T06:00:00.000Z');
  });

  test('when setting a parsed date to the very end of the day', async function (assert) {
    this.set('iso8601', null);
    await render(
      hbs`<InputIso8601 @displayFormat="llll z" @endOfDay?={{true}} @iso8601={{iso8601}} @past?={{false}} @timezone="America/Edmonton" />`
    );

    assert.equal(find('input').value.trim(), '');

    await fillIn('input', 'sep 11 2001');
    assert.equal(find('input').value.trim(), 'Tue, Sep 11, 2001 11:59 PM MDT');
    assert.equal(this.get('iso8601'), '2001-09-12T05:59:59.999Z');
  });

  test('when firing the afterParseFail action on the text bla', async function (assert) {
    this.set('afterParseFail', function (inputDateComponent) {
      assert.equal(inputDateComponent.get('value'), 'bla', 'Failed parse will not change the text value');
      assert.equal(inputDateComponent.get('iso8601'), '');
    });

    this.set('iso8601', new Date().toISOString(2001, 8, 11));
    await render(
      hbs`<InputIso8601 @afterParseFail={{afterParseFail}} @iso8601={{iso8601}} @displayFormat="ll" @past?={{false}} @timezone="America/Edmonton" />`
    );

    assert.equal(find('input').value.trim(), moment(this.get('iso8601')).tz('America/Edmonton').format('ll'));

    await fillIn('input', 'bla');
  });

  test('when firing the afterParseSuccess action on a parse-able date', async function (assert) {
    this.set('afterParseSuccess', function (inputDateComponent) {
      // assert.equal(inputDateComponent.get('value'), 'Sep 11, 2001'); // TODO: cannot get this to fire!
      assert.equal(
        inputDateComponent.get('iso8601'),
        '2001-09-11T06:00:00.000Z',
        'Because this was parsed to Sep 11, 2001 in the America/Edmonton timezone'
      );
    });

    this.set('iso8601', null);
    await render(
      hbs`<InputIso8601 @afterParseSuccess={{afterParseSuccess}} @iso8601={{iso8601}} @displayFormat="ll" @past?={{false}} @timezone="America/Edmonton" />`
    );

    assert.equal(find('input').value.trim(), '');

    await fillIn('input', 'sep 11 2001');
  });

  test('when firing the afterParseSuccess action upon clearing the text field', async function (assert) {
    this.set('afterParseSuccess', function (inputDateComponent) {
      assert.equal(inputDateComponent.get('value'), '');
      assert.equal(inputDateComponent.get('iso8601'), '');
    });

    this.set('iso8601', new Date(2001, 8, 11).toISOString());
    await render(
      hbs`<InputIso8601 @afterParseSuccess={{afterParseSuccess}} @iso8601={{iso8601}} @displayFormat="ll" @past?={{false}} @timezone="America/Edmonton" />`
    );

    assert.equal(find('input').value.trim(), moment(this.get('iso8601')).tz('America/Edmonton').format('ll'));

    await fillIn('input', '');
  });

  test('when firing the beforeParse action the component is passed as an argument', async function (assert) {
    this.set('beforeParse', function (inputDateComponent) {
      assert.equal(inputDateComponent.get('value'), 'sep 11 2001');
    });

    this.set('iso8601', null);
    await render(
      hbs`<InputIso8601 @beforeParse={{beforeParse}} @iso8601={{iso8601}} @displayFormat="ll" @past?={{false}} @timezone="America/Edmonton" />`
    );

    assert.equal(find('input').value.trim(), '');

    await fillIn('input', 'sep 11 2001');
  });

  test('when `past?` set to false requesting `jan` will STILL be in the past', async function (assert) {
    // forcing TODAY's date to Sept 11, 2001
    freezeTime(new Date(2001, 8, 11));

    this.set('iso8601', null);
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} @displayFormat="llll z" @past?={{false}} @timezone="America/Edmonton" />`);

    assert.equal(find('input').value.trim(), '');

    await fillIn('input', 'jan');
    assert.equal(find('input').value.trim(), 'Mon, Jan 1, 2001 12:00 AM MST');
    assert.equal(this.get('iso8601'), '2001-01-01T07:00:00.000Z');
  });

  test('when `past?` set to true requesting `jan` will be in the past', async function (assert) {
    // forcing TODAY's date to Sept 11, 2001
    freezeTime(new Date(2001, 8, 11));

    this.set('iso8601', null);
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} @displayFormat="llll z" @past?={{true}} @timezone="America/Edmonton" />`);

    assert.equal(find('input').value.trim(), '');

    await fillIn('input', 'jan');
    assert.equal(find('input').value.trim(), 'Mon, Jan 1, 2001 12:00 AM MST');
    assert.equal(this.get('iso8601'), '2001-01-01T07:00:00.000Z');
  });

  test('when `future?` set to false requesting `jan` will be in the past', async function (assert) {
    // forcing TODAY's date to Sept 11, 2001
    freezeTime(new Date(2001, 8, 11));

    this.set('iso8601', null);
    await render(
      hbs`<InputIso8601 @iso8601={{iso8601}} @displayFormat="llll z" @future?={{false}} @timezone="America/Edmonton" />`
    );

    assert.equal(find('input').value.trim(), '');

    await fillIn('input', 'jan');
    assert.equal(find('input').value.trim(), 'Mon, Jan 1, 2001 12:00 AM MST');
    assert.equal(this.get('iso8601'), '2001-01-01T07:00:00.000Z');
  });

  test('when `future?` set to true requesting `jan` will be in the future', async function (assert) {
    // forcing TODAY's date to Sept 11, 2001
    freezeTime(new Date(2001, 8, 11));

    this.set('iso8601', null);
    await render(
      hbs`<InputIso8601 @iso8601={{iso8601}} @displayFormat="llll z" @future?={{true}} @timezone="America/Edmonton" />`
    );

    assert.equal(find('input').value.trim(), '');

    await fillIn('input', 'jan');
    assert.equal(find('input').value.trim(), 'Tue, Jan 1, 2002 12:00 AM MST');
    assert.equal(this.get('iso8601'), '2002-01-01T07:00:00.000Z');
  });

  test('when the default timezone is used for Sept 11 2001 at noon', async function (assert) {
    this.set('iso8601', new Date(2001, 8, 11, 12).toISOString());
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} @displayFormat="llll z" />`);
    assert.equal(find('input').value.trim(), moment(this.get('iso8601')).tz(moment.tz.guess()).format('llll z'));
  });

  test('when assigning a date for Sept 11 2001 at noon in New York', async function (assert) {
    this.set('iso8601', moment.tz([2001, 8, 11, 12], 'America/New_York').toISOString());
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} @displayFormat="llll z" @timezone="America/New_York" />`);
    assert.equal(find('input').value.trim(), 'Tue, Sep 11, 2001 12:00 PM EDT');
  });

  test('when parsing a date for Sep 11, 2001 at 4pm in New York', async function (assert) {
    this.set('iso8601', null);
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} @displayFormat="llll z" @timezone="America/New_York" />`);
    assert.equal(find('input').value.trim(), '');
    await fillIn('input', 'sep 11 2001 4pm');
    assert.equal(find('input').value.trim(), 'Tue, Sep 11, 2001 4:00 PM EDT');
    assert.equal(this.get('iso8601'), '2001-09-11T20:00:00.000Z');
  });

  test('when assigning a date for Sept 11 2001 at noon in Vancouver', async function (assert) {
    this.set('iso8601', moment.tz([2001, 8, 11, 12], 'America/Vancouver').toISOString());
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} @displayFormat="llll z" @timezone="America/Vancouver" />`);
    assert.equal(find('input').value.trim(), 'Tue, Sep 11, 2001 12:00 PM PDT');
  });

  test('when parsing a date for Sep 11, 2001 at 4pm in Vancouver', async function (assert) {
    this.set('iso8601', null);
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} @displayFormat="llll z" @timezone="America/Vancouver" />`);
    assert.equal(find('input').value.trim(), '');
    await fillIn('input', 'sep 11 2001 4pm');
    assert.equal(find('input').value.trim(), 'Tue, Sep 11, 2001 4:00 PM PDT');
    assert.equal(this.get('iso8601'), '2001-09-11T23:00:00.000Z');
  });

  test('when initializing with null the text value remains empty', async function (assert) {
    this.set('iso8601', null);
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} />`);
    assert.equal(find('input').value.trim(), '');
  });

  test('when initializing with empty string the text value remains empty', async function (assert) {
    this.set('iso8601', '');
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} />`);
    assert.equal(find('input').value.trim(), '');
  });

  test('when initializing with a date the text value formats to LL', async function (assert) {
    this.set('iso8601', new Date(2001, 8, 11).toISOString());
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} />`);
    assert.equal(find('input').value.trim(), 'September 11, 2001');
  });

  test('when initializing with a date the text value formats to whatever format is supplied', async function (assert) {
    this.set('iso8601', new Date(2001, 8, 11).toISOString());
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} @displayFormat="ll" />`);
    assert.equal(find('input').value.trim(), 'Sep 11, 2001');
  });

  test('when clearing the value the iso8601 property is set to empty string', async function (assert) {
    let sep11 = new Date(2001, 8, 11).toISOString();
    this.set('iso8601', sep11);
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} @displayFormat="ll" />`);
    assert.equal(find('input').value.trim(), 'Sep 11, 2001');
    await fillIn('input', '');
    assert.equal(this.get('iso8601'), '');
  });

  test('when parsing `sep 11 2001` to an iso8601 string', async function (assert) {
    this.set('iso8601', '');
    await render(hbs`<InputIso8601 @displayFormat="LL" @iso8601={{iso8601}} />`);
    assert.equal(this.get('iso8601'), '');
    await fillIn('input', 'sep 11 2001');
    assert.dom('input').hasValue('September 11, 2001');
    assert.equal(this.get('iso8601'), new Date(2001, 8, 11).toISOString());
  });

  test('when typing `bla` the iso8601 parsing fails silently', async function (assert) {
    this.set('iso8601', new Date(2001, 8, 11).toISOString());
    await render(hbs`<InputIso8601 @iso8601={{iso8601}} @displayFormat="ll" />`);
    assert.dom('input').hasValue('Sep 11, 2001');
    await fillIn('input', 'bla');
    assert.dom('input').hasValue('bla');
    assert.equal(this.get('iso8601'), '');
  });
});
