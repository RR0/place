import {PeopleEvent} from "../PeopleEvent";
import {OrganizationRenderOptions} from "../../../org/render/HTMLOrganizationRenderer";
import {RR0Time} from "../../Time";
import {People} from "../../../people/People";
import {Place} from "../../../place/Place";
import {EventRenderOptions, RR0EventType} from "../../Event";
import {Organization} from "../../../org/Organization";


export interface OccupationRenderOptions extends EventRenderOptions {
  verb: boolean
  type: boolean
  org: OrganizationRenderOptions
  role: boolean
}


/**
 * An Occupation event rendering algorithm.
 */
export interface OccupationEventRenderer<R> {

  renderOccupation(event: OccupationEvent, options: OccupationRenderOptions): R
}


export enum MilitaryOccupation {
}

export enum OccupationRole {
  worker = 'worker',
  general = 'general',
}

/**
 * A occupation event.
 */
export class OccupationEvent extends PeopleEvent {

  /**
   * Creates a occupation event.
   *
   * @param who Who was occupation.
   * @param role
   * @param organization The organisation to work for.
   * @param when? When (s)he was occupation.
   * @param where? Where (s)he was occupation.
   */
  constructor(who: People, readonly role: OccupationRole, readonly organization: Organization, when?: RR0Time, where?: Place) {
    super(RR0EventType.occupation, who, when, where);
  }

  /**
   * Render that occupation event.
   *
   * @param renderer The rendering algorithm.
   * @param options
   */
  render<R>(renderer: OccupationEventRenderer<R>, options: OccupationRenderOptions): R {
    return renderer.renderOccupation(this, options)
  }
}
