import {RR0Time, TimeRenderer, TimeRenderOptions} from "./Time";
import {DateTime} from "./DateTime";


/**
 * Unknown time before a date.
 */
export class BeforeTime extends RR0Time {

  /**
   * @param aboveTime A date which is guaranteed to be after the unknown date.
   */
  constructor(readonly aboveTime: DateTime) {
    super();
  }

  render<R>(renderer: TimeRenderer<R>, options: TimeRenderOptions): R {
    return renderer.renderBefore(this, options);
  }

  isBefore(when?: RR0Time): Boolean | null {
    return when ? when.isAfterBefore(this) : null
  }

  isAfter(when?: RR0Time): Boolean | null {
    return when ? when.isBeforeBefore(this) : null
  }

  isBeforeDate(when: DateTime): Boolean {
    return this.aboveTime.date.getTime() <= when.date.getTime();
  }

  isAfterDate(when: DateTime) {
    return when.date.getTime() >= this.aboveTime.date.getTime() ? false : null;
  }

  isAfterBefore(when: BeforeTime): Boolean | null {
    return null;
  }

  isBeforeBefore(when: BeforeTime): Boolean | null {
    return null;
  }
}
