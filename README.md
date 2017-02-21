# ember-cli-date-textbox [![GitHub version](http://badge.fury.io/gh/cybertoothca%2Fember-cli-date-textbox.svg)](http://badge.fury.io/gh/cybertoothca%2Fember-cli-date-textbox) ![](http://embadge.io/v1/badge.svg?start=1.13.0)

[![npm version](http://badge.fury.io/js/ember-cli-date-textbox.svg)](http://badge.fury.io/js/ember-cli-date-textbox) [![CircleCI](http://circleci.com/gh/cybertoothca/ember-cli-date-textbox.svg?style=shield)](http://circleci.com/gh/cybertoothca/ember-cli-date-textbox) [![Code Climate](http://codeclimate.com/github/cybertoothca/ember-cli-date-textbox/badges/gpa.svg)](http://codeclimate.com/github/cybertoothca/ember-cli-date-textbox) ![Dependencies](http://david-dm.org/cybertoothca/ember-cli-date-textbox.svg) [![ember-observer-badge](http://emberobserver.com/badges/ember-cli-date-textbox.svg)](http://emberobserver.com/addons/ember-cli-date-textbox) [![License](http://img.shields.io/npm/l/ember-cli-date-textbox.svg)](LICENSE.md)

This addon provides textbox components that can be used to choose dates by parsing language, e.g. today, 
+1 month, jun 1, etc.

## Demo

The demonstration web application can be found here:
[http://ember-cli-date-textbox.cybertooth.io/](http://ember-cli-date-textbox.cybertooth.io/). 

## What Does This Addon Do?

This addon supplies the following _components_:

* `input-date` - 

_Further information about these items can be found in the Usage section below._

## Requirements

* Ember >= 1.13.0
* Ember CLI

## Installation

The following will install this addon:

    $ ember install ember-cli-date-textbox

### Upgrading

When working through the Ember upgrade process, I recommend
invoking the `ember install ember-cli-date-textbox` command once
you are done to get the latest version of the addon.

## Usage

As mentioned above there are several examples on the demonstration site:
[http://ember-cli-date-textbox.cybertooth.io/](http://ember-cli-date-textbox.cybertooth.io/)

### Components

#### `{{input-date}}`

##### Arguments

* 

([Check out the demo...](http://ember-cli-date-textbox.cybertooth.io/))

### Troubleshooting And Tips

1. Ember-2.3.0+ is required because this addon uses the _hash_ helper.
1. Bootstrap3 CSS and the tooltip Javascript plugin must be installed.

---

# Ember Addon Building And Testing

## Setup

* `git clone git@github.com:cybertoothca/ember-cli-date-textbox.git`
* `npm install`
* `bower install`

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

    [cybertooth]
    aws_access_key_id = <KEY>
    aws_secret_access_key = <SECRET>

Deploy by invoking the following command: `ember deploy production`

Confirm your changes are showing up in our S3 container: http://ember-cli-date-textbox.cybertooth.io/
