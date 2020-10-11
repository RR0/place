import {Place} from '../place/Place'
import {RR0Time, TimeRenderOptions} from "./Time";
import {BirthEventRenderer} from "./people/birth/BirthEvent";
import {OccupationEventRenderer} from "./people/occupation/OccupationEvent";
import {FoundationEventRenderer} from "./org/foundation/FoundationEvent";


export enum RR0EventType {
  birth = 'birth',
  occupation = 'occupation',
  foundation = 'foundation',
}


export interface EventRenderer<R> extends BirthEventRenderer<R>, OccupationEventRenderer<R>, FoundationEventRenderer<R> {

  render(event: RR0Event, options: EventRenderOptions): R
}


export interface EventRenderOptions {
  time: TimeRenderOptions
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
