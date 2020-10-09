import {DateTime} from "./DateTime"
import {BeforeTime} from "./BeforeTime"


export enum TimeWeekdayRenderOptions {
  /**
   * "Thursday"
   */
  long = 'long',

  /**
   * "Thu"
   */
  short = 'short',

  /**
   * "T"
   */
  narrow = 'narrow'
}


export enum TimeEraRenderOptions {
  /**
   * "Anno Domini"
   */
  long = 'long',

  /**
   * "AD"
   */
  short = 'short',

  /**
   * "A"
   */
  narrow = 'narrow'
}


export enum TimeYearRenderOptions {
  /**
   * "2022"
   */
  numeric = 'numeric',

  /**
   * "22"
   */
  twoDigits = '2-digit'
}


export enum TimeMonthRenderOptions {
  /**
   * "2"
   */
  numeric = 'long',

  /**
   * "02"
   */
  twoDigits = '2-digit',

  /**
   * "March"
   */
  long = 'long',

  /**
   * "Mar"
   */
  short = 'short',

  /**
   * "M"
   */
  narrow = 'narrow'
}


export enum TimeDayRenderOptions {
  /**
   * "1"
   */
  numeric = 'numeric',

  /**
   * "01"
   */
  twoDigits = '2-digit'
}


export enum TimeHourRenderOptions {
  /**
   * "1"
   */
  numeric = 'numeric',

  /**
   * "01"
   */
  twoDigits = '2-digit'
}


export enum TimeMinuteRenderOptions {
  /**
   * "1"
   */
  numeric = 'numeric',

  /**
   * "01"
   */
  twoDigits = '2-digit'
}


export enum TimeSecondRenderOptions {
  /**
   * "1"
   */
  numeric = 'numeric',

  /**
   * "01"
   */
  twoDigits = '2-digit'
}


export enum TimeZoneRenderOptions {
  /**
   * "British Summer Time"
   */
  numeric = 'numeric',

  /**
   * "GMT+1"
   */
  twoDigits = 'short',
}


export interface TimeRenderOptions {
  weekday: TimeWeekdayRenderOptions
  month: TimeMonthRenderOptions
  day: TimeDayRenderOptions
  year: TimeYearRenderOptions
}


export class TimeRenderFormat {

  static readonly fullDate: TimeRenderOptions = {
    weekday: TimeWeekdayRenderOptions.long,
    month: TimeMonthRenderOptions.long,
    day: TimeDayRenderOptions.numeric,
    year: TimeYearRenderOptions.numeric
  }
}


export interface TimeRenderer<R> {

  render(time: RR0Time, options: TimeRenderOptions): R

  renderDate(time: DateTime, options: TimeRenderOptions): R

  renderBefore(time: BeforeTime, options: TimeRenderOptions): R
}


export abstract class RR0Time {

  render<R>(renderer: TimeRenderer<R>, options: TimeRenderOptions): R {
    return renderer.render(this, options)
  }

  abstract isBefore(when?: RR0Time): Boolean | null

  abstract isBeforeDate(when: DateTime): Boolean

  abstract isAfter(when?: RR0Time): Boolean | null

  abstract isAfterDate(when: DateTime): Boolean | null

  abstract isAfterBefore(when: BeforeTime): Boolean | null

  abstract isBeforeBefore(when: BeforeTime): Boolean | null
}
