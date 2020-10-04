import {RR0Event, RR0EventType} from "./Event";
import {Place} from "../place/Place";
import {People} from "../people/People";

export abstract class PeopleEvent extends RR0Event {
  protected constructor(
    type: RR0EventType,
    readonly who: People,
    when: Date,
    where: Place,
  ) {
    super(type, when, where);
  }
}
