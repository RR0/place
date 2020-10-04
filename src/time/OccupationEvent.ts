import {RR0EventType} from "./Event";
import {Place} from "../place/Place";
import {People} from "../people/People";
import {PeopleEvent} from './PeopleEvent'
import {RR0Time} from "./Time";
import {Organization} from "../org/Organization";


/**
 * An Occupation event rendering algorithm.
 */
export interface OccupationEventRenderer<R> {

  renderOccupation(event: OccupationEvent): R
}


/**
 * A occupation event.
 */
export class OccupationEvent extends PeopleEvent {

  /**
   * Creates a occupation event.
   *
   * @param who Who was occupation.
   * @param when When (s)he was occupation.
   * @param where Where (s)he was occupation.
   * @param organization The organisation to work for.
   */
  constructor(who: People, readonly organization: Organization, when?: RR0Time, where?: Place) {
    super(RR0EventType.occupation, who, when, where);
  }

  /**
   * Render that occupation event.
   *
   * @param renderer The rendering algorithm.
   */
  render<R>(renderer: OccupationEventRenderer<R>): R {
    return renderer.renderOccupation(this)
  }
}
