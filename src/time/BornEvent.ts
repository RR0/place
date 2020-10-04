import {RR0EventType} from "./Event";
import {Place} from "../place/Place";
import {People} from "../people/People";
import {PeopleEvent} from './PeopleEvent'
import {RR0Time} from "./Time";


export interface BornEventRenderer<R> {
  renderBorn(event: BornEvent): R
}


export class BornEvent extends PeopleEvent {

  constructor(who: People, when?: RR0Time, where?: Place, readonly father?: People, readonly mother?: People) {
    super(RR0EventType.born, who, when, where);
  }

  render<R>(renderer: BornEventRenderer<R>): R {
    return renderer.renderBorn(this)
  }
}
