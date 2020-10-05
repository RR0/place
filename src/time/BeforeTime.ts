import {RR0Time, TimeRenderer} from "./Time";
import {DateTime} from "./DateTime";

/**
 * Unknown time before a date.
 */
export class BeforeTime extends RR0Time {

  /**
   * @param aboveDate A date which is guaranteed to be after the unknown date.
   */
  constructor(readonly aboveDate: Date) {
    super();
  }

  render<R>(renderer: TimeRenderer<R>): R {
    return renderer.renderBefore(this);
  }

  isBefore(when?: RR0Time): Boolean | null {
    return when ? when.isAfterBefore(this) : null
  }

  isAfter(when?: RR0Time): Boolean | null {
    return when ? when.isBeforeBefore(this) : null
  }

  isBeforeDate(when: DateTime): Boolean {
    return this.aboveDate.getTime() <= when.date.getTime();
  }

  isAfterDate(when: DateTime) {
    return when.date.getTime() >= this.aboveDate.getTime() ? false : null;
  }

  isAfterBefore(when: BeforeTime): Boolean | null {
    return null;
  }

  isBeforeBefore(when: BeforeTime): Boolean | null {
    return null;
  }
}
