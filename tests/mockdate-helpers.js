import MockDate from 'mockdate';

import { trySet } from '@ember/object';
import { run } from '@ember/runloop';

/**
 * A reference to the native `Date.now` function.
 */
const nativeDateNowFunction = Date.now;
/**
 * A reference to Backburner's `now` function.
 */
const backburnerPlatformNowFunction = run.backburner._platform.now;

/**
 * Similar to Rails freezeTime.
 * Inspired By ember-mockdate-shim.
 * @param {Date | string | number} date
 * @public
 */
const freezeTime = date => {
  trySet(run, 'backburner._platform.now', nativeDateNowFunction);
  MockDate.set(date);
};

/**
 * Similar to Rails travelBack.
 * Inspired By ember-mockdate-shim.
 * @public
 */
const travelBack = () => {
  trySet(run, 'backburner._platform.now', backburnerPlatformNowFunction);
  MockDate.reset();
};

export { freezeTime, travelBack };
