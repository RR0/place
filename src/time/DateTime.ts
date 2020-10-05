import {RR0Time, TimeRenderer} from "./Time"
import {BeforeTime} from "./BeforeTime"

/**
 * Time as a date.
 */
export class DateTime extends RR0Time {
  constructor(readonly date: Date) {
    super()
  }

  isBefore(when?: RR0Time): Boolean | null {
    return when ? when.isAfterDate(this) : null
  }

  isAfter(when?: RR0Time): Boolean | null {
    return when ? when.isBeforeDate(this) : null
  }

  render<R>(renderer: TimeRenderer<R>): R {
    return renderer.renderDate(this)
  }

  isBeforeDate(when: DateTime): Boolean {
    return this.date.getTime() < when.date.getTime()
  }

  isAfterDate(when: DateTime) {
    return this.date.getTime() > when.date.getTime()
  }

  isAfterBefore(when: BeforeTime): Boolean | null {
    return this.date.getTime() >= when.aboveDate.getTime()
  }

  isBeforeBefore(when: BeforeTime): Boolean | null {
    return this.date.getTime() >= when.aboveDate.getTime() ? false : null
  }
}
