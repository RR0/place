import {RR0Event, RR0EventType} from "./Event";
import {Place} from "../place/Place";
import {People} from "../people/People";
import {RR0Time} from "./Time";

/**
 * Something that occurred about some people.
 */
export abstract class PeopleEvent extends RR0Event {

  protected constructor(type: RR0EventType, readonly who: People, when?: RR0Time, where?: Place) {
    super(type, when, where);
  }
}
