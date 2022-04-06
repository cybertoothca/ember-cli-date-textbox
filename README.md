# ember-cli-date-textbox

[![npm version](http://badge.fury.io/js/ember-cli-date-textbox.svg)](http://badge.fury.io/js/ember-cli-date-textbox) ![downloads](https://img.shields.io/npm/dy/ember-cli-date-textbox.svg) [![Code Climate](http://codeclimate.com/github/cybertoothca/ember-cli-date-textbox/badges/gpa.svg)](http://codeclimate.com/github/cybertoothca/ember-cli-date-textbox)

[![ember-observer-badge](http://emberobserver.com/badges/ember-cli-date-textbox.svg)](http://emberobserver.com/addons/ember-cli-date-textbox)

A textbox that will guess the date you want and assign it to your model or query-params.

# Installation

The following will install this add-on:

```bash
ember install ember-cli-date-textbox
```

### JQuery

JQuery is still required as of 1.2.x of this addon.

### Dependencies

#### `ember-cli-text-support-mixins`

The helper mixins from [`ember-cli-text-support-mixins`](http://ember-cli-text-support-mixins.cybertooth.io/)
are used by this textarea add-on to include support for:

- autofocus
- <kbd>CTRL+ENTER</kbd> submits the closest form
- textarea focus automatically selects text

#### `ember-moment`

Used to format output according the browser locale information.

You should configure `ember-moment` to include the timezone API
([see docs](https://github.com/stefanpenner/ember-moment#include-moment-timezone)).

For example, in your `config/environment.js` add the following to the appropriate environment scope:

```javascript
module.exports = function (/* environment, appConfig */) {
  return {
    moment: {
      // Options:
      // 'all' - all years, all timezones
      // '2010-2020' - 2010-2020, all timezones
      // 'none' - no data, just timezone API
      includeTimezone: "all",
    },
  };
};
```

#### `sugar-date`

Used to parse your english variation of a date into the actual javascript `Date` instance.

## Demo

The demonstration web application can be found here:
[http://ember-cli-date-textbox.cybertooth.io/](http://ember-cli-date-textbox.cybertooth.io/).

## What Does This Add-on Do?

This add-on supplies the following _components_:

- `input-date` - a basic HTML textbox that will take your input and try to parse it to a date. If the parse succeeds,
  the date will be formatted according to your preference. Ideal for binding to your model's date fields (e.g.
  `DS.attr('date')`) or to your component or controller's properties.
- `input-iso8601` - another basic HTML textbox that will once again take your input, parse it to a date, and then
  store the [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) representation of the date. This is a
  great way for binding your date to Ember's query parameters.

_Further information about these items can be found in the Usage section below and in the
[demo (dummy) application](http://ember-cli-date-textbox.cybertooth.io/)._

### Some Bootstrap Love...

If the supplied value can't be parsed to a date, we add the `has-error` style class to the `.form-group` that the
&#123;&#123;input-date&#125;&#125; and/or &#123;&#123;input-iso8601&#125;&#125; belongs to. This visualizes that the date parse was rejected.

## Usage

As mentioned above there are several examples on the demonstration site:
[http://ember-cli-date-textbox.cybertooth.io/](http://ember-cli-date-textbox.cybertooth.io/)

### Components

#### &#123;&#123;input-date&#125;&#125;

This component makes a textbox. It takes in user input in the form of a date that is swiftly parsed and formatted.
The parsed date object is assigned to the component's `date` property.

##### Arguments

- `date` - **REQUIRED**. Rather than binding to the `value` property, this textbox input will be binding to
  the `date` attribute.
- `value` - **DO NOT USE**. I mention the `value` property because you shouldn't bind anything to it. Users
  type in the textbox, the date they settle on will be formatted in the textbox which is assigned to the `value`
  property. In addition...if you supply a valid `date` attribute to this textbox, it will be formatted for you. Don't
  go being all clever trying to do things that are already taken care of for you.
- `afterParseFail` - OPTIONAL, default `undefined`. Use this argument to bind an action that accepts this
  component as an argument. This action will be triggered only when the date parsing fails.
- `afterParseSuccess` - OPTIONAL, default `undefined`. Use this argument to bind an action that accepts this
  component as an argument. This action will be triggered only when the date parsing succeeds.
- `beforeParse` - OPTIONAL, default `undefined`. Use this argument to bind an action that accepts this
  component as an argument. This action will be triggered prior to every parsing action.
- `displayFormat` - OPTIONAL, DEFAULT `LL`. Formatting is done using moment.js. The default format of your
  dates is the localized `LL`. You can change this however you want. See the demo.
- `endOfDay?` - OPTIONAL, DEFAULT `false`.. When parsing dates, always set them to the last
  second of the day.
- `future?` - OPTIONAL, DEFAULT `false`. If `true`, ambiguous dates like `Sunday` will be
  parsed as `next Sunday`. Note that non-ambiguous dates are not guaranteed to be in the
  future. Default is `false`.
- `past?` - OPTIONAL, DEFAULT `false`. If `true`, ambiguous dates like `Sunday` will be parsed
  as `last Sunday`. Note that non-ambiguous dates are not guaranteed to be in the past. Default
  is `false`.
- `startOfDay?` - OPTIONAL, DEFAULT `false`. When parsing dates, always set them to the start
  of the day. If set to `true`, this will take precedence over the `endOfDay` property.
- `timezone` - OPTIONAL, DEFAULT `moment.tz.guess()`. Dates will be parsed and formatted in the specified
  timezone.
- _All the attributes from `ember-cli-text-support-mixins`' &#123;&#123;input-text&#125;&#125;._
  See https://github.com/cybertoothca/ember-cli-text-support-mixins#arguments
- _All the standard input attributes that apply to text boxes._

#### Examples

```handlebars
{{input-date date=myModel.createdOn displayFormat="llll"}}

{{input-date date=someComponentProperty}}

<div class="form-group">
  <label for="js-updated-on" class="control-label">Updated</label>
  {{input-date
    classNames="form-control"
    elementId="js-updated-on"
    date=anotherModel.updatedOn
  }}
  <p class="help-block">Use with bootstrap!</p>
</div>
```

([Check out the demo...](http://ember-cli-date-textbox.cybertooth.io/))

#### &#123;&#123;input-iso8601&#125;&#125;

What's iso8601? Go read: https://en.wikipedia.org/wiki/ISO_8601

Just like &#123;&#123;input-date&#125;&#125;, &#123;&#123;input-iso8601&#125;&#125; also makes a simple textbox. It takes in user input
in the form of a date that is swiftly parsed and formatted.

##### Arguments

- `iso8601` - **REQUIRED & MUST BE A STRING**. Like the &#123;&#123;input-date&#125;&#125; component we do not use the textbox's
  `value` property and instead bind to the `iso8601` attribute. This `iso8601` attribute expects a String and it
  should be in ISO format (e.g. `yyyy-MM-ddTHH:mm:ssZ`).
- `value` - **DO NOT USE**. I mention the `value` property because you shouldn't bind anything to it. Users
  type in the textbox, the date they settle on will be formatted in the textbox which is assigned to the `value`
  property. In addition...if you supply a valid `date` attribute to this textbox, it will be formatted for you. Don't
  go being all clever trying to do things that are already taken care of for you.
- `afterParseFail` - OPTIONAL, default `undefined`. Use this argument to bind an action that accepts this
  component as an argument. This action will be triggered only when the date parsing fails.
- `afterParseSuccess` - OPTIONAL, default `undefined`. Use this argument to bind an action that accepts this
  component as an argument. This action will be triggered only when the date parsing succeeds.
- `beforeParse` - OPTIONAL, default `undefined`. Use this argument to bind an action that accepts this
  component as an argument. This action will be triggered prior to every parsing action.
- `displayFormat` - OPTIONAL, DEFAULT `LL`. Formatting is done using moment.js. The default format of your dates is the localized
  `LL`. You can change this however you want. See the demo.
- `endOfDay?` - OPTIONAL, DEFAULT `false`.. When parsing dates, always set them to the last
  second of the day.
- `future?` - OPTIONAL, DEFAULT `false`. If `true`, ambiguous dates like `Sunday` will be
  parsed as `next Sunday`. Note that non-ambiguous dates are not guaranteed to be in the
  future. Default is `false`.
- `past?` - OPTIONAL, DEFAULT `false`. If `true`, ambiguous dates like `Sunday` will be parsed
  as `last Sunday`. Note that non-ambiguous dates are not guaranteed to be in the past. Default
  is `false`.
- `startOfDay?` - OPTIONAL, DEFAULT `false`. When parsing dates, always set them to the start
  of the day. If set to `true`, this will take precedence over the `endOfDay` property.
- `timezone` - OPTIONAL, DEFAULT `moment.tz.guess()`. Dates will be parsed and formatted
  in the specified timezone.
- _All the attributes from `ember-cli-text-support-mixins`' &#123;&#123;input-text&#125;&#125;._
  See https://github.com/cybertoothca/ember-cli-text-support-mixins#arguments
- _All the standard input attributes that apply to text boxes._

#### Examples

```handlebars
{{input-iso8601 iso8601=myControllerProperty displayFormat="llll"}}

<div class="form-group">
  <label for="js-from" class="control-label">Date From</label>
  {{input-iso8601
    classNames="form-control"
    elementId="js-from"
    iso8601=anotherControllerProperty
  }}
  <p class="help-block">Use with bootstrap!</p>
</div>
```

([Check out the demo...](http://ember-cli-date-textbox.cybertooth.io/))

---

# Ember Add-on Building And Testing

## Setup

```bash
git clone git@github.com:cybertoothca/ember-cli-date-textbox.git
cd ember-cli-date-textbox
yarn install
```

### Linting

- `yarn lint:js`
- `yarn lint:js -- --fix`

### Running tests

- `ember test` – Runs the test suite on the current Ember version
- `ember test --server` – Runs the test suite in "watch mode"
- `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

- `ember serve`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Running The Dummy Application

- `ember server`
- Visit your app at http://localhost:4200.

## Running Add-on Tests

- `npm test` (Runs `ember try:testall` to test your add-on against multiple Ember versions)
- `ember test`
- `ember test --server`

## Building The Add-on

- `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

```
ember install my-addon
```

# License

This project is licensed under the [MIT License](LICENSE.md).

# Linking This Add-on For Local Testing

## Linking

Use yarn.

```bash
# from this add-on project
$ yarn link
# from the other project that depends on this add-on
$ yarn link ember-cli-date-textbox
```

## Unlinking

Again, use yarn.

```bash
# from the other project that linked to this add-on
$ yarn unlink ember-cli-date-textbox
# from this add-on project
$ yarn unlink
```

# Deploying The Dummy Application

Make sure your `~/.aws/credentials` file has a profile named _cybertooth_
with a valid key and secret,

```text
[cybertooth]
aws_access_key_id = <KEY>
aws_secret_access_key = <SECRET>
```

Deploy by invoking the following command: `ember deploy production`

Confirm your changes are showing up in our S3 container: http://ember-cli-date-textbox.cybertooth.io/

# Releasing & Publishing To NPM

```bash
yarn publish
git push
git push --tags
ember deploy production
```
