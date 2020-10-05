import {DateTime} from "./DateTime"
import {BeforeTime} from "./BeforeTime"

export interface TimeRenderer<R> {

  render(time: RR0Time): R

  renderDate(time: DateTime): R

  renderBefore(time: BeforeTime): R
}


export abstract class RR0Time {

  render<R>(renderer: TimeRenderer<R>): R {
    return renderer.render(this)
  }

  abstract isBefore(when?: RR0Time): Boolean | null

  abstract isBeforeDate(when: DateTime): Boolean

  abstract isAfter(when?: RR0Time): Boolean | null

  abstract isAfterDate(when: DateTime): Boolean | null

  abstract isAfterBefore(when: BeforeTime): Boolean | null

  abstract isBeforeBefore(when: BeforeTime): Boolean | null
}
