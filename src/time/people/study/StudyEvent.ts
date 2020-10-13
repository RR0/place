import {PeopleEvent} from "../PeopleEvent";
import {OrganizationRenderOptions} from "../../../org/render/HTMLOrganizationRenderer";
import {RR0Time} from "../../Time";
import {People} from "../../../people/People";
import {Place} from "../../../place/Place";
import {EventRenderOptions, RR0EventType} from "../../Event";
import {School} from "../../../org/School";


export interface StudyRenderOptions extends EventRenderOptions {
  verb: boolean
  type: boolean
  org: OrganizationRenderOptions
  role: boolean
}


/**
 * An Study event rendering algorithm.
 */
export interface StudyEventRenderer<R> {

  renderStudy(event: StudyEvent, options: StudyRenderOptions): R
}


/**
 * A occupation event.
 */
export class StudyEvent extends PeopleEvent {

  /**
   * Creates a occupation event.
   *
   * @param who Who was occupation.
   * @param school The organisation to work for.
   * @param when??? When (s)he was occupation.
   * @param where??? Where (s)he was occupation.
   */
  constructor(who: People, readonly school: School, when?: RR0Time, where?: Place) {
    super(RR0EventType.study, who, when, where);
  }

  /**
   * Render that occupation event.
   *
   * @param renderer The rendering algorithm.
   * @param options
   */
  render<R>(renderer: StudyEventRenderer<R>, options: StudyRenderOptions): R {
    return renderer.renderStudy(this, options)
  }
}
