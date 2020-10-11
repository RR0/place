import {RR0Time} from "../../Time";
import {EventRenderOptions, RR0EventType} from "../../Event";
import {OrganizationRenderOptions} from "../../../org/render/HTMLOrganizationRenderer";
import {Place} from "../../../place/Place";
import {OrganizationEvent} from "../OrganizationEvent";
import {OccupationRenderOptions} from "../../people/occupation/OccupationEvent";
import {Organization} from "../../../org/Organization";
import {People} from "../../../people/People";
import {PeopleRenderOptions} from "../../../people/render/HTMLPeopleRenderer";


export interface FoundationParentRenderOptions {
  occupation: OccupationRenderOptions
  people: PeopleRenderOptions
  organization: OrganizationRenderOptions
}


export interface FoundationEventRenderOptions extends EventRenderOptions {
  organization: OrganizationRenderOptions
  founders: FoundationParentRenderOptions
}


/**
 * A foundation event rendering algorithm.
 */
export interface FoundationEventRenderer<R> {

  renderFoundation(event: FoundationEvent, options: FoundationEventRenderOptions): R
}


/**
 * A foundation event.
 */
export class FoundationEvent extends OrganizationEvent {

  /**
   * Creates a foundation event.
   *
   * @param org Which organization was founded.
   * @param when When it was founded.
   * @param where Where it was founded.
   * @param founders
   */
  constructor(org: Organization, when?: RR0Time, where?: Place, readonly founders?: (Organization | People)[]) {
    super(RR0EventType.foundation, org, when, where);
  }

  /**
   * Render that foundation event.
   *
   * @param renderer The rendering algorithm.
   * @param options
   */
  render<R>(renderer: FoundationEventRenderer<R>, options: FoundationEventRenderOptions): R {
    return renderer.renderFoundation(this, options)
  }
}
