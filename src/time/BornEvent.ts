import {RR0EventType} from "./Event";
import {Place} from "../place/Place";
import {People} from "../people/People";
import {PeopleEvent} from './PeopleEvent'
import {RR0Time} from "./Time";


/**
 * A birth event rendering algorithm.
 */
export interface BornEventRenderer<R> {

  renderBorn(event: BornEvent): R
}


/**
 * A birth event.
 */
export class BornEvent extends PeopleEvent {

  /**
   * Creates a birth event.
   *
   * @param who Who was born.
   * @param when When (s)he was born.
   * @param where Where (s)he was born.
   * @param father The father of that born child.
   * @param mother The mother of that born child.
   */
  constructor(who: People, when?: RR0Time, where?: Place, readonly father?: People, readonly mother?: People) {
    super(RR0EventType.born, who, when, where);
  }

  /**
   * Render that birth event.
   *
   * @param renderer The rendering algorithm.
   */
  render<R>(renderer: BornEventRenderer<R>): R {
    return renderer.renderBorn(this)
  }
}
