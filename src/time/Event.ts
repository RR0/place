import {Place} from '../place/Place'
import {BornEventRenderer} from "./BornEvent";
import {RR0Time} from "./Time";

export enum RR0EventType {
  born = 'born'
}


export interface EventRenderer<R> extends BornEventRenderer<R> {
  render(event: RR0Event): R
}


export abstract class RR0Event {

  protected constructor(readonly type: RR0EventType, readonly when?: RR0Time, readonly where?: Place) {
  }

  abstract render<R>(renderer: EventRenderer<R>): R
}
