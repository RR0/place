import {Place} from '../place/Place'
import {BirthEventRenderer} from "./BirthEvent";
import {RR0Time} from "./Time";
import {OccupationEventRenderer} from "./OccupationEvent";


export enum RR0EventType {
  birth = 'birth',
  occupation = 'occupation',
}


export interface EventRenderer<R> extends BirthEventRenderer<R>, OccupationEventRenderer<R> {

  render(event: RR0Event): R
}


export interface EventRenderOptions {
}


/**
 * Something that occurred.
 */
export abstract class RR0Event {

  protected constructor(readonly type: RR0EventType, readonly when?: RR0Time, readonly where?: Place) {
  }

  abstract render<R>(renderer: EventRenderer<R>, options: EventRenderOptions): R

  /**
   * If an event is chronologically before another.
   *
   * @return null if not known.
   */
  isBefore(otherEvent: RR0Event): Boolean | null {
    return this.when ? this.when.isBefore(otherEvent.when) : null;
  }

  isAfter(otherEvent: RR0Event) {
    return this.when ? this.when.isAfter(otherEvent.when) : null;
  }
}
