# ember-cli-date-textbox [![GitHub version](http://badge.fury.io/gh/cybertoothca%2Fember-cli-date-textbox.svg)](http://badge.fury.io/gh/cybertoothca%2Fember-cli-date-textbox) ![](https://embadge.io/v1/badge.svg?start=1.13.0)

[![npm version](http://badge.fury.io/js/ember-cli-date-textbox.svg)](http://badge.fury.io/js/ember-cli-date-textbox) ![downloads](https://img.shields.io/npm/dy/ember-cli-date-textbox.svg) [![CircleCI](http://circleci.com/gh/cybertoothca/ember-cli-date-textbox.svg?style=shield)](http://circleci.com/gh/cybertoothca/ember-cli-date-textbox) [![Code Climate](http://codeclimate.com/github/cybertoothca/ember-cli-date-textbox/badges/gpa.svg)](http://codeclimate.com/github/cybertoothca/ember-cli-date-textbox) ![Dependencies](http://david-dm.org/cybertoothca/ember-cli-date-textbox.svg) [![ember-observer-badge](http://emberobserver.com/badges/ember-cli-date-textbox.svg)](http://emberobserver.com/addons/ember-cli-date-textbox) [![License](http://img.shields.io/npm/l/ember-cli-date-textbox.svg)](LICENSE.md)

A textbox that will guess the date you want and assign it to your model or query-params.

## Tested Against

[![ember-lts-2.4](https://img.shields.io/badge/ember--try-ember--lts--2.4-brightgreen.svg)](https://circleci.com/gh/cybertoothca/ember-cli-textarea-autosize)
[![ember-lts-2.8](https://img.shields.io/badge/ember--try-ember--lts--2.8-brightgreen.svg)](https://circleci.com/gh/cybertoothca/ember-cli-textarea-autosize)
[![ember-lts-2.12](https://img.shields.io/badge/ember--try-ember--lts--2.12-brightgreen.svg)](https://circleci.com/gh/cybertoothca/ember-cli-textarea-autosize)

[![ember-release](https://img.shields.io/badge/ember--try-ember--release-brightgreen.svg)](https://circleci.com/gh/cybertoothca/ember-cli-textarea-autosize)
[![ember-beta](https://img.shields.io/badge/ember--try-ember--beta-brightgreen.svg)](https://circleci.com/gh/cybertoothca/ember-cli-textarea-autosize)
[![ember-canary](https://img.shields.io/badge/ember--try-ember--canary-brightgreen.svg)](https://circleci.com/gh/cybertoothca/ember-cli-textarea-autosize)

## Demo

The demonstration web application can be found here:
[http://ember-cli-date-textbox.cybertooth.io/](http://ember-cli-date-textbox.cybertooth.io/). 

## What Does This Addon Do?

This addon supplies the following _components_:

* `input-date` - a basic HTML textbox that will take your input and try to parse it to a date.  If the parse succeeds,
the date will be formatted according to your preference.  Ideal for binding to your model's date fields (e.g. 
`DS.attr('date')`) or to your component or controller's properties.
* `input-iso8601` - another basic HTML textbox that will once again take your input, parse it to a date, and then
store the [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) representation of the date.  This is a 
great way for binding your date to Ember's query parameters.

_Further information about these items can be found in the Usage section below and in the 
[demo (dummy) application](http://ember-cli-date-textbox.cybertooth.io/)._

### Some Bootstrap Love...

If the supplied value can't be parsed to a date, we add the `has-error` style class to the `.form-group` that the
&#123;&#123;input-date&#125;&#125; and/or &#123;&#123;input-iso8601&#125;&#125; belongs to.  This visualizes that the date parse was rejected.

## Requirements

* Ember >= 1.13.0
* Ember CLI

### Dependencies

#### Ember Addon

The following Ember addons will automatically be added into your Ember product:

* `ember-cli-text-support-mixins` - https://github.com/cybertoothca/ember-cli-text-support-mixins - `Ember.TextSupport` 
enhancements including a &#123;&#123;input-text&#125;&#125; and &#123;&#123;text-area&#125;&#125; component.

#### Bower

The following Bower dependencies are automatically installed into your Ember product:
 
* `datejs-parse-plus` - https://github.com/cybertoothca/Datejs - A fork of the original Datejs 
(https://github.com/datejs/Datejs) library that is careful to not override the `Date`'s `parse(...)` function.
* `moment` - https://github.com/moment/moment
* `moment-timezone` - https://github.com/moment/moment-timezone

## Installation

The following will install this addon:

```
ember install ember-cli-date-textbox
```

### Upgrading

When working through the Ember upgrade process, I recommend
invoking the `ember install ember-cli-date-textbox` command once
you are done to get the latest version of the addon.

This will likely update the bower dependencies listed above.

## Usage

As mentioned above there are several examples on the demonstration site:
[http://ember-cli-date-textbox.cybertooth.io/](http://ember-cli-date-textbox.cybertooth.io/)

### Components

#### &#123;&#123;input-date&#125;&#125;

This component makes a textbox.  It takes in user input in the form of a date that is swiftly parsed and formatted.
The parsed date object is assigned to the component's `date` property. 

##### Arguments

* `date` - **REQUIRED**.  Rather than binding to the `value` property, this textbox input will be binding to
the `date` attribute.
* `value` - **DO NOT USE**.  I mention the `value` property because you shouldn't bind anything to it.  Users
type in the textbox, the date they settle on will be formatted in the textbox which is assigned to the `value`
property.  In addition...if you supply a valid `date` attribute to this textbox, it will be formatted for you.  Don't
go being all clever trying to do things that are already taken care of for you.
* `displayFormat` - OPTIONAL, DEFAULT `LL`.  Formatting is done using moment.js.  The default format of your dates is the localized
`LL`.  You can change this however you want.  See the demo.
* `startOfDay` - **COMING SOON** OPTIONAL, DEFAULT `false`.  When parsing dates, always set them to the start 
of the day.  If set to `true`, this will take precedence over the `endOfDay` property.
* `endOfDay` - **COMING SOON** OPTIONAL, DEFAULT `false`..  When parsing dates, always set them to the last 
second of the day.
* `timezone` - OPTIONAL, DEFAULT `moment.tz.guess()`.  Dates will be parsed and formatted in the specified
timezone.
* _All the attributes from `ember-cli-text-support-mixins`' &#123;&#123;input-text&#125;&#125;._
See https://github.com/cybertoothca/ember-cli-text-support-mixins#arguments
* _All the standard input attributes that apply to text boxes._

#### Examples

```
{{input-date date=myModel.createdOn displayFormat="llll"}}

{{input-date date=someComponentProperty}}

<div class="form-group">
  <label for="js-updated-on" class="control-label">Updated</label>
  {{input-date classNames="form-control" elementId="js-updated-on" date=anotherModel.updatedOn}}
  <p class="help-block">Use with bootstrap!</p>
</div>
```

([Check out the demo...](http://ember-cli-date-textbox.cybertooth.io/))

#### &#123;&#123;input-iso8601&#125;&#125;

What's iso8601?  Go read: https://en.wikipedia.org/wiki/ISO_8601

Just like &#123;&#123;input-date&#125;&#125;, &#123;&#123;input-iso8601&#125;&#125; also makes a simple textbox.  It takes in user input 
in the form of a date that is swiftly parsed and formatted. 

##### Arguments

* `iso8601` - **REQUIRED & MUST BE A STRING**.  Like the &#123;&#123;input-date&#125;&#125; component we do not use the textbox's
`value` property and instead bind to the `iso8601` attribute.  This `iso8601` attribute expects a String and it
should be in ISO format (e.g. `yyyy-MM-ddTHH:mm:ssZ`).
* `value` - **DO NOT USE**.  I mention the `value` property because you shouldn't bind anything to it.  Users
type in the textbox, the date they settle on will be formatted in the textbox which is assigned to the `value`
property.  In addition...if you supply a valid `date` attribute to this textbox, it will be formatted for you.  Don't
go being all clever trying to do things that are already taken care of for you.
* `displayFormat` - OPTIONAL, DEFAULT `LL`.  Formatting is done using moment.js.  The default format of your dates is the localized
`LL`.  You can change this however you want.  See the demo.
* `startOfDay` - **COMING SOON** OPTIONAL, DEFAULT `false`.  When parsing dates, always set them to the start 
of the day.  If set to `true`, this will take precedence over the `endOfDay` property.
* `endOfDay` - **COMING SOON** OPTIONAL, DEFAULT `false`..  When parsing dates, always set them to the last 
second of the day.
* `timezone` - OPTIONAL, DEFAULT `moment.tz.guess()`.  Dates will be parsed and formatted 
in the specified timezone.
* _All the attributes from `ember-cli-text-support-mixins`' &#123;&#123;input-text&#125;&#125;._
See https://github.com/cybertoothca/ember-cli-text-support-mixins#arguments
* _All the standard input attributes that apply to text boxes._

#### Examples

```
{{input-iso8601 iso8601=myControllerProperty displayFormat="llll"}}

<div class="form-group">
  <label for="js-from" class="control-label">Date From</label>
  {{input-iso8601 classNames="form-control" elementId="js-from" iso8601=anotherControllerProperty}}
  <p class="help-block">Use with bootstrap!</p>
</div>
```

([Check out the demo...](http://ember-cli-date-textbox.cybertooth.io/))

### Troubleshooting And Tips

_None...at least that I can think of._

---

# Ember Addon Building And Testing

## Setup

### Checkout

```
git clone git@github.com:cybertoothca/ember-cli-textarea-autosize.git
```

### With NPM

```
npm install
```

### With Yarn

```
yarn
```

## Running The Dummy Application

* `ember server`
* Visit your app at http://localhost:4200.

## Running Addon Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building The Addon

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

# Linking This Addon For Local Testing

## Linking

1. From the command line at the root of __this__ project run the
`npm link` command to _link_ this addon within your local
node repository.
1. From the _other_ Ember project that you wish to test this addon
in, execute the following command:
`npm link ember-cli-date-textbox`.
1. Now in that same _other_ Ember project, you should go into the
`package.json` and add the ember addon with the version _*_.  It will
look something like this: `"ember-cli-date-textbox": "*"`.  Now
when/if you execute `npm install` on this _other_ project it
will know to look for the linked addon rather than fetch it from
the central repository.

## Unlinking

1. Remove the addon from your local node repository with the following
command (that can be run anywhere):
`npm uninstall -g ember-cli-date-textbox`
1. Remove the reference to the `ember-cli-date-textbox`
in your _other_ project's `package.json`.
1. Run an `npm prune` and `bower prune` from the root of your _other_ project's command line.

# Deploying The Dummy Application

Make sure your `~/.aws/credentials` file has a profile named _cybertooth_ 
with a valid key and secret,

```
[cybertooth]
aws_access_key_id = <KEY>
aws_secret_access_key = <SECRET>
```

Deploy by invoking the following command: `ember deploy production`

Confirm your changes are showing up in our S3 container: http://ember-cli-date-textbox.cybertooth.io/

# Releasing & Publishing To NPM

```
npm version x.y.z-sub.#
git push
git push --tags
npm publish
```
