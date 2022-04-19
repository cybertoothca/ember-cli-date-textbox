import Controller from '@ember/controller';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

export default class IndexController extends Controller {
  @action submitDate(event) {
    event.preventDefault();
    const dateString = isPresent(this.submittedDate) ? this.submittedDate.toString() : null;
    window.alert(`Form was submitted and this is the String value: ${dateString}`);
  }

  @action submitIso8601(event) {
    event.preventDefault();
    window.alert(`Form was submitted and this is the String value: ${this.submittedIso8601}`);
  }

  ambiguousFuture = null;

  get ambiguousFutureISOString() {
    if (isPresent(this.ambiguousFuture)) {
      return this.ambiguousFuture.toISOString();
    } else {
      return 'Type A Date...';
    }
  }

  dateAsParam = new Date().toISOString();

  dateWithTimezone = null;

  get dateWithTimezoneISOString() {
    if (isPresent(this.dateWithTimezone)) {
      return this.dateWithTimezone.toISOString();
    } else {
      return 'Choose A Date...';
    }
  }

  demoDate = null;

  get demoDateISOString() {
    if (isPresent(this.demoDate)) {
      return this.demoDate.toISOString();
    } else {
      return 'Choose A Date...';
    }
  }

  iso8601WithTimezone = '';

  submittedIso8601 = '';

  wasEmptyUntilNow = '';
}
