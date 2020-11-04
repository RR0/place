import {HTML, HTMLRenderer} from "../../../HTMLRenderer";
import {OccupationEvent, OccupationEventRenderer, OccupationRenderOptions} from "./OccupationEvent";
import {OrganizationRenderer} from "../../../org/Organization";
import {WithEventMessages} from "../../EventMessages";
import {HTMLPeopleRenderer} from "../../../people/render/HTMLPeopleRenderer";
import {Translation} from "@rr0/lang";


export class HTMLOccupationRenderer extends HTMLRenderer implements OccupationEventRenderer<HTML> {

  constructor(translation: Translation<WithEventMessages>, private orgRenderer: OrganizationRenderer<HTML>, private peopleRenderer: HTMLPeopleRenderer) {
    super(translation)
  }

  renderOccupation(occupation: OccupationEvent, options: OccupationRenderOptions): HTML {
    const values: any = {}
    values.who = this.peopleRenderer.render(occupation.who, options.who)
    if (options.role) {
      const role = occupation.role;
      if (role) {
        values.role = this.translation.translate(this.translation.messages.dict[role][occupation.who.gender])
      }
    }
    if (options.org) {
      const org = occupation.organization;
      if (org) {
        values.org = org.render(this.orgRenderer, options.org)
      }
    }
    const key = this.translation.compoundKey(Object.keys(values).concat(options.verb ? 'verb' : []))
    return this.translation.translateKey(this.translation.messages.event.people.occupation, key, values)
  }
}
