import {EventRenderer, EventRenderOptions, RR0EventType} from "./Event";
import {Place} from "../place/Place";
import {People} from "../people/People";
import {PeopleEvent} from './PeopleEvent'
import {RR0Time} from "./Time";
import {PeopleRenderOptions} from "../people/render/HTMLPeopleRenderer";
import {OccupationRenderOptions} from "./OccupationEvent";
import {OrganizationDescriptionOptions} from "../org/render/HTMLOrganizationRenderer";


export class OccupationFormat {
  static none: OccupationRenderOptions = {
    verb: false,
    type: false,
    role: false,
    org: {
      name: {
        long: false, short: false
      },
      description: OrganizationDescriptionOptions.none,
      types: {army: {}, company: {products: false}}
    }
  }
}


export interface BirthParentRenderOptions {
  occupation: OccupationRenderOptions
  people: PeopleRenderOptions
}


export interface BirthEventRenderOptions extends EventRenderOptions {
  people: PeopleRenderOptions
  parent: BirthParentRenderOptions
}


/**
 * A birth event rendering algorithm.
 */
export interface BirthEventRenderer<R> {

  renderBirth(event: BirthEvent, options: BirthEventRenderOptions): R
}


/**
 * A birth event.
 */
export class BirthEvent extends PeopleEvent {

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
    super(RR0EventType.birth, who, when, where);
  }

  /**
   * Render that birth event.
   *
   * @param renderer The rendering algorithm.
   * @param options
   */
  render<R>(renderer: EventRenderer<R>, options: BirthEventRenderOptions): R {
    return renderer.renderBirth(this, options)
  }
}
